import { IonAlert, IonContent, IonItem, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Books } from './Books';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

interface BMProps {
    db: SQLiteDBConnection,
    handleBookmark: any,
    SortBookmark: number,
}

const Bookmarks = ({ db, handleBookmark, SortBookmark }: BMProps) => {
    const [BmList, setBmList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [BmDetail, setBmDetail] = useState<{ Book: number, Chapter: number, Verse: number }>({
        Book: 0, Chapter: 1, Verse: 1
    });


    const BMDBConn = async () => {
        let query = "";
        if (SortBookmark == 0) {
            query = 'SELECT Book, Chapter, Versecount, verse_en, favorite from bible WHERE favorite is not null ORDER by favorite DESC';
        } else {
            query = "SELECT Book, Chapter, Versecount, verse_en, favorite from bible WHERE favorite is not null"
        }
        const res = await db.query(query);
        setBmList(res.values);
    }

    const RemoveBM = async (val: any) => {
        var updateBM: string
        if (val == 'confirm') {
            updateBM = 'UPDATE bible SET favorite = NULL WHERE Book = ? AND Chapter = ? AND Versecount = ?';
            const result = await db.run(updateBM, [BmDetail.Book, BmDetail.Chapter, BmDetail.Verse]);
            let query = "";
            if (SortBookmark == 0) {
                query = 'SELECT Book, Chapter, Versecount, verse_en, favorite from bible WHERE favorite is not null ORDER by favorite DESC';
            } else {
                query = "SELECT Book, Chapter, Versecount, verse_en, favorite from bible WHERE favorite is not null"
            }
            const res = await db.query(query);
            setBmList(res.values);
        }
    }

    function DateModifier(dateString: string) {
        let year = dateString.substring(0, 4);
        let month = parseInt(dateString.substring(5, 7));
        let day = dateString.substring(8, 10);
        const monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dateMod = day + " " + monthString[month - 1] + " " + year;
        return dateMod;
    }

    useEffect(() => {
        BMDBConn();
    }, [SortBookmark]);


    const Ids = BmList.map((item: any, no: number) => {
        var BibleId = Books[item.Book].BookN + " " + item.Chapter + ":" + item.Versecount;
        return <IonItem key={no} button
            onContextMenu={() => {
                setBmDetail({ Book: item.Book, Chapter: item.Chapter, Verse: item.Versecount })
                setIsOpen(true);
            }} onClick={() => handleBookmark(item.Book, item.Chapter, item.Versecount)}>
            <IonLabel class='ion-text-wrap'><h6><b>{BibleId}</b> - <b>{DateModifier(item.favorite)}</b></h6>{item.verse_en}</IonLabel>
        </IonItem>
    });

    const BmSelected = Books[BmDetail.Book].BookN + " " + BmDetail.Chapter + ":" + BmDetail.Verse;
    var a = 25; var b = 5

    return (<IonContent>{Ids}
        <IonAlert
            isOpen={isOpen}
            header="Remove Bookmark"
            trigger="present-alert"
            message={"Are you sure you want to remove " + BmSelected}
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'OK',
                    role: 'confirm',
                },
            ]}
            onDidDismiss={({ detail }) => { RemoveBM(detail.role); setIsOpen(false) }}
        ></IonAlert></IonContent>)
};
export default Bookmarks;
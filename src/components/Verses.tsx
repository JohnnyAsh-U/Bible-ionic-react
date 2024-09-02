import { useEffect, useRef, useState } from 'react';
import { IonActionSheet, IonItem, IonLabel, IonList, IonProgressBar } from '@ionic/react';
import FabButton from './FabButtons';
import { Books } from './Books';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

interface VersesProps {
  BookIndex: number,
  ChapterNo: number,
  VerseNo: number
  Language: string,
  handleNextChapter: (e: any) => void,
  handlePreviousChapter: (e: any) => void;
  db: SQLiteDBConnection;
}

const Verses = ({ BookIndex, ChapterNo, VerseNo, Language, handleNextChapter, handlePreviousChapter, db }: VersesProps) => {

  const listRef = useRef<HTMLIonListElement>(null)
  const [BookVersesList, setBookVersesList] = useState<any>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState<boolean>(true);
  const [VerseIdActionSheet, setVerseIdActionSheet] = useState<{ id: number, IsBookmarked: boolean }>({
    id: 0,
    IsBookmarked: false,
  });


  const handlerBookmark = async (verseId: number) => {
    var updateBM: string;
    if (VerseIdActionSheet.IsBookmarked == true) {
      updateBM = 'UPDATE bible SET favorite = NULL WHERE Book = ? AND Chapter = ? AND Versecount = ?';
      await db.run(updateBM, [BookIndex, ChapterNo, VerseIdActionSheet.id]);
    } else {
      updateBM = "UPDATE bible SET favorite = datetime('now') WHERE Book = ? AND Chapter = ? AND Versecount = ?";
      await db.run(updateBM, [BookIndex, ChapterNo, VerseIdActionSheet.id]);
    }

    let query = 'SELECT Book, Chapter, Versecount, verse_en, verse_fr, favorite from bible WHERE Book = ?'
    const result = await db.query(query, [BookIndex]);
    setBookVersesList(result.values);
  }

  const dismissActionSheet = (value: any) => {
    if (value.role == "backdrop") {
      setIsOpen(false);
    } else {
      handlerBookmark(value.data.action)
      setIsOpen(false)
    };
  }

  const scrollToItem = (index: number) => {
    if (listRef.current) {
      const item = listRef.current.children[index - 1];
      item.scrollIntoView({ behavior: 'instant' });
    }
  }

  const Dbconn = async () => {
    let query = 'SELECT Book, Chapter, Versecount, verse_en, verse_fr, favorite from bible WHERE Book = ?'
    const res = await db.query(query, [BookIndex]);
    setBookVersesList(res.values);
    setloading(false);
  }

  useEffect(() => {
    if (db) {
      Dbconn()
    }
    setIsOpen(false);
  }, [BookIndex, db]);

  useEffect(() => {
    if(!loading){
      scrollToItem(VerseNo);
    }
  }, [ChapterNo, loading])



  const Verses = BookVersesList.filter((obj: any) => obj.Chapter === ChapterNo);
  const VersesList = Verses.map((Ver: any, no: number) => {
    let VerseLang = Language == "NKJV" ? Ver.verse_en : Ver.verse_fr;
    let Bookmarked: boolean, Bmcolor: string;
    let Verse: any;
    if (Ver.favorite == null) {
      Bookmarked = false;
      Bmcolor = '';
      Verse = VerseLang;
    } else {
      Bookmarked = true;
      Bmcolor = 'danger';
      Verse = <b>{VerseLang}</b>
    }
    return <IonItem button key={no + 1} onClick={() => { setVerseIdActionSheet({ id: no + 1, IsBookmarked: Bookmarked }); setIsOpen(true) }}>
      <IonLabel class='ion-text-wrap' color={Bmcolor}>
        <sup style={{ color: 'blue' }} ><strong>{Ver.Versecount}</strong></sup> {Verse}
      </IonLabel>
    </IonItem>
  });

  const Bookm = VerseIdActionSheet.IsBookmarked == true ? "Remove BookMark" : "Add Bookmark";

  return (<>
    <IonList ref={listRef}>
      {loading && <IonProgressBar color={"dark"} type='indeterminate'></IonProgressBar>}
      {!loading && VersesList}
      <IonItem lines='none'>
        <IonLabel class='ion-text-wrap'></IonLabel>
      </IonItem>
      <IonItem lines='none'>
        <IonLabel class='ion-text-wrap'></IonLabel>
      </IonItem>
    </IonList>
    <FabButton
      BookId={BookIndex}
      ChapterNo={ChapterNo}
      handleNextChapter={handleNextChapter}
      handlePreviousChapter={handlePreviousChapter} />
    <IonActionSheet
      isOpen={isOpen}
      header="Options"
      buttons={[
        {
          text: Books[BookIndex].BookN + " " + ChapterNo + ":" + VerseIdActionSheet.id + ' - ' + Bookm,
          data: {
            action: VerseIdActionSheet.id,
          },
        },
      ]}
      onDidDismiss={({ detail }) => dismissActionSheet(detail)}></IonActionSheet>
  </>
  );
};

export default Verses;
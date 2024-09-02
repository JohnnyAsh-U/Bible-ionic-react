import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import {
    IonAlert,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonProgressBar,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Books } from '../Books';
import { arrowBack, checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import '../SubHeader.css';

interface FirstPageProps {
    db: SQLiteDBConnection,
    handler: (val: number) => void,
}

const Start = [
    { Book: 0, Chapter: 1, Versecount: 1, Verse: "John" },
    { Book: 1, Chapter: 15, Versecount: 1, Verse: "Esther" },
    { Book: 2, Chapter: 6, Versecount: 5, Verse: "Robert" },
    { Book: 10, Chapter: 1, Versecount: 1, Verse: "Now King David was old, advanced in years; and they put covers on him, but he could not get warm." },
]

function FirstPage({ db, handler }: FirstPageProps) {
    const [progress, setProgress] = useState(0.1);
    const [AllQues, setAllQues] = useState<any>([]);
    const [presentQ, setPresentQ] = useState<any>({});
    const [QuestionOptions, setQuestionOptions] = useState<any>([]);
    const [Answer, setAnswer] = useState<any>("");
    const [Selected, setSelected] = useState<any>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [AnotherGame, setAnotherGame] = useState<number>(0);
    const [Total, setTotal] = useState<number>(0);

    const QuestionNo = Math.round(progress * 10);

    function shuffleArray(array: Array<any>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const FetchBM = async () => {
        let query = "SELECT Book, Chapter, Versecount, verse_en, favorite from bible WHERE favorite is not null"
        const res = await db.query(query);
        let ValArray: any = res.values;
        shuffleArray(ValArray);
        setAllQues(ValArray);
    }

    const CheckOption = (val : any) => {
        setSelected(val);
        if(val == Answer){
            setTotal(Total + 1);
        }else {
            setTimeout(() => {
                setSelected(Answer);
            }, 1000);
        }
        setTimeout(() => {
            setProgress(progress + 0.1);
        }, 2000);
    }

    useEffect(() => {
        FetchBM();
    }, [AnotherGame]);


    useEffect(() => {
        setSelected("");
        AllQues.map((item: any, index: number) => {
            if (index == QuestionNo - 1) {
                let AllOptions: string[] = [];
                for (let a = 0; a < 3; a++) {
                    let Options = AllQues[Math.floor(Math.random() * AllQues.length)];
                    let OptionScripture = Books[Options.Book].BookN + " " + Options.Chapter + ":" + Options.Versecount;
                    AllOptions.push(OptionScripture);
                }
                let BibleScripture = Books[item.Book].BookN + " " + item.Chapter + ":" + item.Versecount;
                AllOptions.push(BibleScripture);
                shuffleArray(AllOptions);
                setAnswer(BibleScripture);
                setPresentQ({ Book: item.Book, Chapter: item.Chapter, VerseNo: item.Versecount, Verse: item.verse_en });
                setQuestionOptions(AllOptions);
            }
        });
        if (progress > 1) {  
            setProgress(0.1);
            setIsOpen(true)
        };
    }, [progress, AllQues]);


    const BibleOp = QuestionOptions.map((ops: any, index: number) => {
        var classN = Selected == Answer ? "custom-item" : "wrong-item";
        return <IonItem className={Selected == ops ? classN : ""} lines='full' button onClick={() =>  CheckOption(ops)} key={index}>
            <IonLabel style={{ textAlign: "center" }}>
                {ops}
            </IonLabel>
        </IonItem>
    });



    return (<>
        <IonHeader>
            <IonToolbar color={"light"}>
                <IonButtons slot='start'>
                    <IonButton onClick={() => handler(0)}><IonIcon icon={arrowBack}></IonIcon></IonButton>
                </IonButtons>
                <IonTitle>Question {QuestionNo} /10</IonTitle>
                <IonProgressBar value={progress}></IonProgressBar>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonCard color={"medium"}>
                <IonCardHeader >
                    <IonCardTitle>
                        "{presentQ.Verse}"
                    </IonCardTitle>
                </IonCardHeader>
            </IonCard>
            <IonCard >
                <IonCardContent >
                    <IonList>
                        {BibleOp}
                    </IonList>
                </IonCardContent>

            </IonCard>
            <IonAlert
                isOpen={isOpen}
                header="Game Over"
                message={"You Got " + Total +" out of 10 Questions"}
                buttons={[
                    {
                      text: 'New Game',
                      handler: () => {
                        setAnotherGame(AnotherGame+1)
                      },
                    },
                    {
                      text: 'OK',
                      handler: () => {
                        handler(0);
                      },
                    },
                  ]}
                onDidDismiss={() => setIsOpen(false)}
            ></IonAlert>
        </IonContent>
    </>
    );
}
export default FirstPage;
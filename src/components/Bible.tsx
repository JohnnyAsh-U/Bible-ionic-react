import { IonContent } from '@ionic/react';
import React, { createRef, useEffect, useState } from 'react';
import HeaderComp from './HeaderBible';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import Verses from './Verses';

const contentRef = createRef<HTMLIonContentElement>();

interface BibleProps {
  handler: (a: number, b: number, c:number) => void,
  bId: any,
  cId: any,
  vId: any,
  database: SQLiteDBConnection,
}

const Bible = ({ handler, bId, cId, vId, database }: BibleProps) => {
  const [Language, setLanguage] = useState<string>("NKJV");
  const [Book, setBook] = useState<number>(bId);
  const [Chapter, setChapter] = useState<number>(cId);
  const [Verse, setVerse] = useState<number>(vId);

  const ChangeLanguage = () => {
    if (Language == "NKJV") {
      setLanguage("LSV");
    } else {
      setLanguage("NKJV");
    }
  }

  const BookChange = (id: any) => {
    setBook(id);
    setChapter(1);
    setVerse(1)
  };

  const ChapterChange = (id: any) => {
    setChapter(id);
    setVerse(1);
  }

  const NextChapter = () => {
    setChapter(Chapter + 1);
    setVerse(1)
  }

  const PreviousChapter = () => {
    setChapter(Chapter - 1);
    setVerse(1);
  }

  useEffect(() => {
    return () => {
      handler(Book, Chapter, 1);
    }
  }, [Book, Chapter]);


  return (<>
    <HeaderComp BookId={Book}
      ChapterID={Chapter}
      handleBookChange={(id) => BookChange(id)}
      handleChapterChange={(id) => ChapterChange(id)}
      handlerLanguage={ChangeLanguage}
      Language={Language} />

    <IonContent >
      <Verses
        BookIndex={Book}
        ChapterNo={Chapter}
        VerseNo = {Verse}
        Language={Language}
        handleNextChapter={NextChapter}
        handlePreviousChapter={PreviousChapter}
        db={database} />
    </IonContent>
  </>
  )
}
export default Bible;
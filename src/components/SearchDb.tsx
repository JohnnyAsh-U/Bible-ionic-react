import React, { useEffect, useState } from 'react';
import { IonContent, IonItem, IonLabel, IonProgressBar, IonToast } from '@ionic/react';
import { Books } from "./Books";
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import "./Search.css";

interface SearchProps {
  Testament: number,
  BookIndex: number,
  SearchText: string,
  db : SQLiteDBConnection,
}

const SearchBible = ({ Testament, BookIndex, SearchText, db}: SearchProps) => {

  const [BibleSearchRes, setBibleSearchRes] = useState<any>([]);
  const [LoadingRes, setLoadingRes] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<{isOpen : boolean, message : string}>({isOpen : false, message : ""});

  const BibleSearch = async () => {
    setLoadingRes(2);
    let SearchValue = '%'+SearchText+'%'
    if (BookIndex == 0) {
      let searchBtwTestament: Array<number> = [];
      Testament == 1 ? searchBtwTestament.push(0, 38) : searchBtwTestament.push(39, 65);
      let query = `SELECT * from bible WHERE verse_en like '%${SearchText}%' AND Book BETWEEN ? AND ? LIMIT 200`;
      const res = await db.query(query, searchBtwTestament);
      if(res.values?.length !==0){
        setBibleSearchRes(res.values);
        setLoadingRes(0);
        let resMessage = res.values?.length + " results found"
        setIsOpen({isOpen: true, message : resMessage});
      }else{
        setLoadingRes(1);
        let resMessage = "No results found"
        setIsOpen({isOpen : true, message : resMessage})
      }
    } else {
      let SearchBookId = Testament == 1 ? BookIndex - 1 : BookIndex + 38;
      let query = "SELECT * from bible WHERE verse_en like ? AND Book = ? LIMIT 200";
      const res = await db.query(query, [SearchValue, SearchBookId]);
      if(res.values?.length !==0){
        setBibleSearchRes(res.values);
        setLoadingRes(0);
        let resMessage = res.values?.length + " results found"
        setIsOpen({isOpen: true, message : resMessage});
      }else{
        setLoadingRes(1);
        let resMessage = res.values?.length + " results found"
        setIsOpen({isOpen: true, message : resMessage});
      }
    }
  }

  function FormatText(VerseText :string, Target : string) {
    let regex = RegExp(Target, 'gi');
    let substrings = VerseText.split(regex);
    const formattedText = substrings.map((substring, index) => {
      return (
      <React.Fragment key={index}>
        {index > 0 && <strong>{Target}</strong>}
        {substring}
      </React.Fragment>
      )
    });
    return formattedText;
  }


  useEffect(() => {
    if(SearchText.length !== 0 ){
      BibleSearch();
    }
  }, [BookIndex, Testament, SearchText]);

  const Empty = <div className="container"><strong>Nothing To Show</strong></div>;

  const Results = BibleSearchRes.map((item: any, id: number) => {
    var BibleId = Books[item.Book].BookN + " " + item.Chapter + ":" + item.Versecount;
    return <IonItem key={id}><IonLabel class='ion-text-wrap'><h6><b>{BibleId}</b></h6>{FormatText(item.verse_en, SearchText)}</IonLabel></IonItem>
  })

  return (
    <IonContent overflow-scroll="false">
      {LoadingRes === 0 && Results}
      {LoadingRes === 1 && Empty}
      {LoadingRes === 2 && <IonProgressBar color={"dark"} type="indeterminate"></IonProgressBar>}
      <IonToast
          className = 'my'
          isOpen={isOpen.isOpen}
          message={isOpen.message}
          onDidDismiss={() => setIsOpen({isOpen : false, message : ""})}
          duration={2000}
        ></IonToast>
    </IonContent>
  )
};
export default SearchBible;
import { IonButtons, IonHeader, IonItem, IonItemDivider, IonMenuButton, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {Books} from './Books';
import SearchBible from './SearchDb';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

interface SProps {
  database : SQLiteDBConnection
}

const Search = ({database} : SProps) => {

  const [SearchVal, setSearchVal] = useState<any>("");
  const [SearchTestament, setSearchTestament] = useState<number>(1);
  const [SearchBook, setSearchBook] = useState<number>(0);

  var ListBook : any = [];
  var All = "";
  if(SearchTestament == 1){
    ListBook = Books.filter((obj) => obj.id > -1 && obj.id < 39);
    All = "All OT";
  }else if(SearchTestament == 2){
    ListBook = Books.filter((obj) => obj.id > 38 );
    All = "All NT";
  }

  useEffect(() => {
    setSearchBook(0);
  }, [SearchTestament])

  return (<>
    <IonHeader>
      <IonToolbar color={"dark"}>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle >
          <IonSearchbar placeholder="Search The Bible" animated={true} onIonChange = {(e)=>setSearchVal(e.detail.value?.replace(/^\W+|\W+$/g, ""))}></IonSearchbar>
        </IonTitle>
      </IonToolbar>
      <IonToolbar>
        <IonTitle>
          <IonItem>
            <IonItemDivider>
              <IonSelect interface='popover' value = {SearchTestament} labelPlacement="floating" label='Select Testament' placeholder="Select Testament" onIonChange={(e) => {setSearchBook(0) ; setSearchTestament(e.detail.value)}}>
                <IonSelectOption value = {1}>Old Testament</IonSelectOption>
                <IonSelectOption value = {2}>New Testament</IonSelectOption>
              </IonSelect>
            </IonItemDivider>
            <IonItemDivider>
              <IonSelect interface='popover' value={SearchBook} placeholder="Select Book" label='Select Book' labelPlacement='floating' onIonChange={(e)=>setSearchBook(e.detail.value)}>
              <IonSelectOption value={0}>{All}</IonSelectOption>
              {ListBook.map((object : any, id : number)=><IonSelectOption key={id} value={id+1}>{object.BookN}</IonSelectOption>)}
              </IonSelect>
            </IonItemDivider>
          </IonItem>
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <SearchBible Testament={SearchTestament} BookIndex={SearchBook} SearchText={SearchVal} db = {database} />
    </>
  )
}
export default Search;

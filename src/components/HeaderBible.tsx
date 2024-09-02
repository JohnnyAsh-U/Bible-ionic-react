import { IonButtons, IonMenuButton, IonButton, IonHeader, IonToolbar, IonLabel, IonToast } from '@ionic/react';
import React from 'react';
import ModalPage from './ModalPage';
import './SubHeader.css';

interface HeaderCompProps {
  BookId: number,
  ChapterID: number,
  handleBookChange: (id : any) => void,
  handleChapterChange: (e: any) => void,
  handlerLanguage: (e: any) => void,
  Language: string,
}

const HeaderComp = ({ BookId, ChapterID, handleBookChange, handleChapterChange, handlerLanguage, Language }: HeaderCompProps) => {

  var setLang;
  var Toast;

  if (Language == "NKJV") {
    setLang = <IonLabel class='ion-text-wrap'>FRE</IonLabel>;
    Toast = <IonToast className='my' trigger="d" message="English Bible - NKJV" duration={1000}></IonToast>
  } else {
    setLang = <IonLabel class='ion-text-wrap'>ENG</IonLabel>;
    Toast = <IonToast className='my' trigger="d" message="French Bible - LSV" duration={1000}></IonToast>;
  }

  return (
    <IonHeader>
      <IonToolbar color={"dark"} slot='fixed'>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonButtons>
          <ModalPage 
          BookId={ BookId} 
          ChapterNo = {ChapterID} 
          BookChange = {(id: any) => handleBookChange(id)} 
          ChapterChange = {(id: any) => handleChapterChange(id)}
          />
        </IonButtons>
        <IonButtons slot="end">
          <IonButton id='d' color="light" shape='round' fill='solid' onClick={(e) => handlerLanguage(e)}>{setLang}</IonButton>
        </IonButtons>
      </IonToolbar>
      {Toast}
    </IonHeader>
  );
}
export default HeaderComp;
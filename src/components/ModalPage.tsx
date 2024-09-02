import { IonModal, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonButtons, IonButton, IonContent, IonIcon }  from "@ionic/react";
import { chevronDownOutline } from "ionicons/icons";
import React, { useState } from "react";
import BookList from "./BooksList";
import { Books } from "./Books";
import Chapters from "./Chapters";

interface ModalPageProps {
  BookId : number,
  ChapterNo : number,
  BookChange : (id: any) => void,
  ChapterChange : (id : any) => void,
}

const ModalPage = ({ BookId, ChapterNo, BookChange, ChapterChange }: ModalPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [segment, setSegment ] = useState<any>("books");

  const handleSegment =(val: any, bookindex : any) => {
    setSegment(val);
    BookChange(bookindex);
  }

  const ModalChapterClose = (id :any ) => {
    ChapterChange(id);
    setIsOpen(false);
  }
  
  return (<>
    <IonButton expand="block" size='large' onClick={() => setIsOpen(true)}>{Books[BookId].BookN}  {ChapterNo}
      <IonIcon icon={chevronDownOutline}></IonIcon></IonButton>
    <IonModal isOpen={isOpen} onDidDismiss = {()=> setIsOpen(false)}>
      <IonHeader>
        <IonToolbar>
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value)}>
            <IonSegmentButton value="books">
              <IonLabel>Books</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="chapters">
              <IonLabel>Chapters</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {segment ==="books" && <BookList BookIndex = {BookId} handleSeg = {handleSegment}/>}
        {segment === "chapters" && <Chapters BookIndex={ BookId } ModalChapterCloser = {(id) => ModalChapterClose(id)}/>}
      </IonContent>
    </IonModal>
    </>
  );
}
export default ModalPage;
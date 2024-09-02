import { IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import React from "react";
import { Books } from './Books';

interface FabButtonProp {
    BookId : number, 
    ChapterNo : number,
    handleNextChapter : (e: any) => void,
    handlePreviousChapter : (e : any) => void;
}

const FabButton = ({ BookId, ChapterNo, handleNextChapter, handlePreviousChapter} : FabButtonProp) => {

    const next = <IonFab horizontal="end" vertical="bottom" slot="fixed">
        <IonFabButton size='small' color={"default"} onClick = {(e)=>{handleNextChapter(e)}}>
        <IonIcon icon={chevronForwardOutline}></IonIcon>
        </IonFabButton>
        </IonFab>

    const previous =  <IonFab horizontal="start" vertical="bottom" slot='fixed'>
        <IonFabButton size='small' color={"default"} onClick = {(e)=>{handlePreviousChapter(e)}}>
        <IonIcon icon={chevronBackOutline}></IonIcon>
        </IonFabButton>
        </IonFab>
    const Chapters = Books[BookId].chapters ;

    return (<>
    { ChapterNo == 1 ? null : previous }
    { ChapterNo == Chapters ? null : next }
    </>
    );
}
export default FabButton;
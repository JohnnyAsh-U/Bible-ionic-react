import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenuButton, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import React from 'react';

interface HeaderProps {
  PageNo : number,
  handlerBookmarkSorting : (val : number)=>void,
}

const BmHeader = ({PageNo, handlerBookmarkSorting} : HeaderProps) => {

  var title = ""

  if (PageNo == 2) {
    title = "Bookmarks"
  } else if (PageNo == 4) {
    title = "Bible Game"
  }else if(PageNo == 5) {
    title = "About"
  };

  return (
    <IonHeader>
      <IonToolbar color={"dark"} slot='fixed'>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle slot="start">
          {title}
        </IonTitle>
        {PageNo == 2 && <IonButtons slot='primary'>
          <IonButton id="click-trigger"><IonIcon icon={ellipsisVertical}></IonIcon></IonButton>
          <IonPopover trigger="click-trigger" alignment='end' size='auto' dismissOnSelect={true} triggerAction="click">
            <IonContent>
              <IonItem button lines='full' onClick={() => handlerBookmarkSorting(0)}>
                Sort By Date
              </IonItem>
              <IonItem button lines='none' onClick={() => handlerBookmarkSorting(1)}>
                Sort By Book
              </IonItem>
            </IonContent>
          </IonPopover>
        </IonButtons>}
      </IonToolbar>
    </IonHeader>
  )
}
export default BmHeader;
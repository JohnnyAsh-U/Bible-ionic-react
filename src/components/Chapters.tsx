import React from 'react';
import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from '@ionic/react';
import { Books } from './Books';

interface ChaptersProps {
  BookIndex: number;
  ModalChapterCloser: (id: any) => void,
}

const Chapters = ({ BookIndex, ModalChapterCloser }: ChaptersProps) => {

  const ChaptersList = Array.from({ length: Books[BookIndex].chapters }, (_, index) => {
    return <IonCol key={index} size='3'><IonItem button lines='none'  id={(index + 1).toString()} onClick={() => ModalChapterCloser(index + 1)}>
      <IonLabel className='ion-justify-content-end'>{index + 1}</IonLabel>
    </IonItem></IonCol>
  })

  return (
    <><h4 style={{ textAlign: 'center' }}>{Books[BookIndex].BookN}</h4>
      <IonGrid>
        <IonRow>{ChaptersList}</IonRow>
      </IonGrid>
    </>
  );
}
export default Chapters;

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonNavLink
} from '@ionic/react';
import FirstPage from './GameComp/FirstPage';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { useState } from 'react';

interface GameProp {
  database: SQLiteDBConnection,
}

function Game({ database }: GameProp) {
  const [NewGame, setNewGame] = useState<number>(0);
  const handleS =(val : number) => {
    setNewGame(val);
  }
  return (<>
    {NewGame == 0 && <IonContent>
      <IonCard style={{ textAlign: "center" }}>
        <IonCardHeader>
          <IonCardTitle class='ion-justify-content-center'>Find The Verses Game</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>The offset property will change the column's left margin for all breakpoints.
          Column also provides several offset properties with the breakpoint name appended t
          o the end of "offset". These properties can be used to change the offset of t
          he column based on the screen size. Open the below example in StackBlitz and re
          size the screen to see the column offsets change.
        </IonCardContent>
        <IonButton expand="block" onClick={() => setNewGame(1)}>
          Start Bible Game
        </IonButton>
      </IonCard>
    </IonContent>}
    {NewGame == 1 && <FirstPage db={database} handler = {handleS}/>}
    </>
  );
}
export default Game;
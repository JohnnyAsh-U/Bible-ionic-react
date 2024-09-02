
import React, { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonItem, IonLabel, IonProgressBar } from '@ionic/react';
import { caretDownCircleSharp, checkboxSharp, checkmarkCircleOutline, checkmarkDoneCircle, checkmarkDoneCircleSharp, checkmarkDoneOutline, checkmarkDoneSharp, closeCircleOutline, shieldCheckmarkOutline } from 'ionicons/icons';

function About() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 0.1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (progress > 1) {
    setTimeout(() => {

      setProgress(0);
    }, 1000);
  }

  return (
    <IonContent>
      <IonProgressBar value={progress}></IonProgressBar>
      <IonItem lines='full' button>
        <IonLabel style={{ textAlign: "center" }} color={'success'}>
          {"something"}  <IonIcon icon = {checkmarkCircleOutline}></IonIcon>
        </IonLabel>
      </IonItem>
      <IonIcon icon = {checkmarkCircleOutline} color='success'></IonIcon>
      <IonIcon icon = {caretDownCircleSharp}  color='success'></IonIcon>
      <IonIcon icon = {checkmarkDoneCircleSharp}  color='success'></IonIcon>
      <IonIcon icon = {closeCircleOutline} ></IonIcon>
    </IonContent>);
}
export default About;
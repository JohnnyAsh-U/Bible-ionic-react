import { IonItem, IonLabel, IonList, IonMenuToggle } from '@ionic/react';

interface SideBarProps {
    PageChange: (e :any) => void,
}
const SideBar = ({ PageChange }: SideBarProps) => {

    return (<>
        <IonMenuToggle>
            <IonList>
            <IonItem button lines="full" id='1' detail={true} onClick={(e) => PageChange(e)}>
                <IonLabel class='ion-text-wrap'>Home</IonLabel>
            </IonItem>
            <IonItem button lines="full" detail = {true} id='2' onClick={(e) => PageChange(e)}>
                <IonLabel class='ion-text-wrap'>Bookmarks</IonLabel>
            </IonItem>
            <IonItem button lines="full" id='3' detail = {true} onClick={(e) => PageChange(e)}>
                <IonLabel class='ion-text-wrap'>Search</IonLabel>
            </IonItem>
            <IonItem button lines="full" id='4' detail = {true} onClick={(e) => PageChange(e)}>
                <IonLabel class='ion-text-wrap'>Game</IonLabel>
            </IonItem>
            <IonItem button lines="full" id='5' detail = {true} onClick={(e) => PageChange(e)}>
                <IonLabel class='ion-text-wrap'>About</IonLabel>
            </IonItem>
            </IonList>
        </IonMenuToggle>
    </>
    )
};
export default SideBar;
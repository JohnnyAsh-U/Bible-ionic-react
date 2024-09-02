import React, { createRef } from 'react';
import { IonContent, IonHeader, IonPage, IonMenu, IonTitle, IonToolbar, IonNav } from '@ionic/react';
import SideBar from '../components/SideBar';
import BmHeader from '../components/HeaderPages';
import Bookmarks from '../components/Bookmarks';
import Search from '../components/Search';
import Bible from '../components/Bible';
import About from '../components/About';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import Game from '../components/Game';

type HomeStates = {
  Pages: number;
  BmSort: number;
}

interface MyProps {
  db: SQLiteDBConnection,
}

class Home extends React.Component<MyProps, HomeStates> {
  BookId: React.RefObject<number>;
  ChapterId: React.RefObject<number>;
  VerseId: React.RefObject<number>;
  constructor(props: any) {
    super(props);
    this.state = {
      Pages: 1,
      BmSort: 0,
    };
    this.BookId = createRef();
    this.ChapterId = createRef();  //@ts-ignore
    this.VerseId = createRef(); //@ts-ignore
    this.BookId.current = 0;  //@ts-ignore
    this.ChapterId.current = 1;   //@ts-ignore
    this.VerseId.current = 1;
  }



  handleDes = (bId: number, cId: number, vId: number): void => {   //@ts-ignore
    this.BookId.current = bId;   //@ts-ignore
    this.ChapterId.current = cId; //@ts-ignore
    this.VerseId.current = vId;
  }

  handlePageChange = (e: any) => {
    e.preventDefault();
    this.setState({
      Pages: e.currentTarget.id
    })
  };

  handleBookmark = (Book: any, Chapter: any, Verse: any) => { //@ts-ignore
    this.BookId.current = Book;   //@ts-ignore
    this.ChapterId.current = Chapter; //@ts-ignore
    this.VerseId.current = Verse;
    this.setState({
      Pages: 1,
    });
  };

  handleBookmarkSort = (val: number) => {
    this.setState({ BmSort: val });
  }

  render() {
    return (<>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color={"dark"}>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <SideBar PageChange={(e) => this.handlePageChange(e)} />
        </IonContent>
      </IonMenu>
      <IonPage id='main-content'>
        {this.state.Pages == 1 &&
          <Bible
            database={this.props.db}
            handler={(Book: number, Chapter: number) => this.handleDes(Book, Chapter, 1)}
            bId={this.BookId.current}
            cId={this.ChapterId.current}
            vId={this.VerseId.current}
          />
        }

        {this.state.Pages == 2 &&
          <>
            <BmHeader PageNo={this.state.Pages} handlerBookmarkSorting={this.handleBookmarkSort} />
            <Bookmarks SortBookmark={this.state.BmSort} handleBookmark={(a: any, b: any, c: any) => this.handleBookmark(a, b, c)} db={this.props.db} />
          </>}

        {this.state.Pages == 3 &&
          <Search database={this.props.db} />}

        {this.state.Pages == 4 &&
          <>
            <BmHeader PageNo={this.state.Pages} handlerBookmarkSorting={this.handleBookmarkSort} />
            <Game database = {this.props.db} />
          </>
        }
        {this.state.Pages == 5 &&
          <>
            <BmHeader PageNo={this.state.Pages} handlerBookmarkSorting={this.handleBookmarkSort} />
            <About />
          </>
        }
      </IonPage>
    </>
    )
  }
}
export default Home;

import './App.css';
import {
  Contact,
  FloatingActionable,
  MobileNavigation,
  Navigation,
  TagBar,
  TopBar,
} from './components';
import firebase from 'firebase/compat/app';
import { FC, useCallback } from 'react';

interface AppProps {
  user: firebase.User | null;
  classItems: JSX.Element;
}

const App: FC<AppProps> = ({ user, classItems }): JSX.Element => {
  const handleContactModalOpen = useCallback(() => {
    const contactModal = document.getElementById(
      'contact-modal'
    ) as HTMLDialogElement;
    contactModal?.parentElement?.classList.remove('hide');
    contactModal?.showModal();
  }, []);

  let userElement: JSX.Element;
  if (user && user.photoURL) {
    userElement = (
      <div className="user">
        <img id="user-img" src={user.photoURL} alt="User profile" />
      </div>
    );
  } else {
    userElement = <div className="hide"></div>;
  }

  return (
    <div className="App">
      <Contact />
      <div className="container">
        <Navigation />
      </div>
      <div className="main">
        <TopBar user={user} userElement={userElement} />
        <TagBar />
        <div id="course-container">{classItems}</div>
      </div>
      <FloatingActionable handleContactModalOpen={handleContactModalOpen} />
      <MobileNavigation handleContactModalOpen={handleContactModalOpen} />
    </div>
  );
};

export default App;

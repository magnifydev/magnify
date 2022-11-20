import './App.css';
import {
  ContactForm,
  FloatingActionable,
  MobileNavigation,
  Navigation,
  TagBar,
  TopBar,
} from './components';
import firebase from 'firebase/compat/app';
import { FC, useCallback, useEffect } from 'react';

interface AppProps {
  user: firebase.User | null;
  classItems: JSX.Element;
}

const App: FC<AppProps> = ({ user, classItems }): JSX.Element => {
  // Hacky workaround because something with React probably interferes with the default browser behavior
  // Also, reactivates the highlight on the course element
  useEffect(() => {
    const jumpId = window.location.hash.replace('#', '')
    window.location.hash = ''
    window.location.hash = jumpId;
  }, []);

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
      <ContactForm />
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

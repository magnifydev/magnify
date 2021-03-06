import './App.css';
import { Contact } from './components';
import { links } from './data';
import { scrollToTop } from './utils';
import firebase from 'firebase/compat/app';
import { FC, useCallback } from 'react';

interface AppProps {
  user: firebase.User | null;
  classItems: JSX.Element;
}

const App: FC<AppProps> = ({ user, classItems }): JSX.Element => {
  const handleTagToggle = (id: string): void => {
    const tag = document.getElementById(id);
    if (tag?.classList.contains('tag-true')) {
      tag.classList.remove('tag-true');
    } else {
      tag?.classList.add('tag-true');
    }
  };

  const handleTagTrueRemove = useCallback(() => {
    const tags = document.getElementsByClassName('tag');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        tags[i].classList.remove('tag-true');
      }
    }
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
      <Contact />
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a href="/" aria-label="Magnify" title="Magnify">
                <span className="icon logo">M</span>
                <span className="title">Magnify</span>
              </a>
            </li>
            <li className="hovered">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" aria-label="Search" title="Search">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="search-outline" />
                </span>
                <span className="title">Search</span>
              </a>
            </li>
            <li>
              <a
                href={links.programOfStudiesPDF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PDF"
                title="PDF"
              >
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon
                    name="document-text-outline"
                    aria-label="PDF"
                    title="PDF"
                  />
                </span>
                <span className="title">PDF</span>
              </a>
            </li>
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon
                    name="logo-github"
                    aria-label="GitHub"
                    title="GitHub"
                  />
                </span>
                <span className="title">GitHub</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="top-bar">
          <div className="search">
            <i>
              {/* @ts-expect-error ts(2339) */}
              <ion-icon name="search-outline" />
            </i>
            <input
              id="searchbar"
              name="search"
              placeholder="Search for classes..."
            />
          </div>
          <button type="button" id="signer" className="login">
            {user ? 'Sign Out' : 'Login'}
          </button>
          {userElement}
        </div>
        <div className="tag-container">
          <button
            type="button"
            id="ALL"
            className="tag tag-all"
            onClick={handleTagTrueRemove}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            All
          </button>
          <button
            type="button"
            id="ENG"
            className="tag"
            onClick={useCallback(() => handleTagToggle('ENG'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            English
          </button>
          <button
            type="button"
            id="FOR"
            className="tag"
            onClick={useCallback(() => handleTagToggle('FOR'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Foreign Language
          </button>
          <button
            type="button"
            id="MAT"
            className="tag"
            onClick={useCallback(() => handleTagToggle('MAT'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Math
          </button>
          <button
            type="button"
            id="SCI"
            className="tag"
            onClick={useCallback(() => handleTagToggle('SCI'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Science
          </button>
          <button
            type="button"
            id="SOC"
            className="tag"
            onClick={useCallback(() => handleTagToggle('SOC'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            History
          </button>
          <button
            type="button"
            id="HPE"
            className="tag"
            onClick={useCallback(() => handleTagToggle('HPE'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Health/PE
          </button>
          <button
            type="button"
            id="BUS"
            className="tag"
            onClick={useCallback(() => handleTagToggle('BUS'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Business
          </button>
          <button
            type="button"
            id="IND"
            className="tag"
            onClick={useCallback(() => handleTagToggle('IND'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Engineering
          </button>
          <button
            type="button"
            id="ART"
            className="tag"
            onClick={useCallback(() => handleTagToggle('ART'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Art
          </button>
          <button
            type="button"
            id="MUS"
            className="tag"
            onClick={useCallback(() => handleTagToggle('MUS'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Music
          </button>
          <button
            type="button"
            id="AGR"
            className="tag"
            onClick={useCallback(() => handleTagToggle('AGR'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Agriculture
          </button>
          <button
            type="button"
            id="FAM"
            className="tag"
            onClick={useCallback(() => handleTagToggle('FAM'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            FCS
          </button>
          <button
            type="button"
            id="TAG"
            className="tag"
            onClick={useCallback(() => handleTagToggle('TAG'), [])}
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            TAG
          </button>
        </div>
        <div id="course-container">{classItems}</div>
      </div>
      <div className="floating-button-container">
        <button
          type="button"
          onClick={scrollToTop}
          id="to-top"
          className="jump-to-top"
        >
          {/* @ts-expect-error ts(2339) */}
          <ion-icon name="chevron-up-outline" size="larger" />
        </button>
        <button
          type="button"
          onClick={handleContactModalOpen}
          id="contact-modal-open"
          className="contact-modal-button"
        >
          {/* @ts-expect-error ts(2339) */}
          <ion-icon name="mail-outline" size="larger" />
        </button>
      </div>
      <div id="mobile-nav" className="mobile-navigation">
        <a
          href={links.programOfStudiesPDF}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-navigation-button"
        >
          PDF
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-navigation-button"
        >
          GitHub
        </a>
        <button
          type="button"
          onClick={handleContactModalOpen}
          className="mobile-navigation-button mobile-contact-modal-button"
        >
          Contact
        </button>
        <button
          type="button"
          onClick={scrollToTop}
          className="mobile-navigation-button"
        >
          {/* @ts-expect-error ts(2339) */}
          <ion-icon name="chevron-up-outline" size="larger" />
        </button>
      </div>
    </div>
  );
};

export default App;

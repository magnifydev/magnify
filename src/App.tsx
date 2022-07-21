import './App.css';
import links from './data/links';
import firebase from 'firebase/compat/app';
import { FC } from 'react';

interface AppProps {
  user: firebase.User | null;
  classItems: JSX.Element;
}

const App: FC<AppProps> = ({ user, classItems }) => {
  const toggleTag = (id: string): void => {
    const tag = document.getElementById(id);
    if (tag?.classList.contains('tag-true')) {
      tag.classList.remove('tag-true');
    } else {
      tag?.classList.add('tag-true');
    }
  };

  const scrollToTop = (): void => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  // const toggleNav = (): void => {
  //   // if (
  //   //   getComputedStyle(document.documentElement)
  //   //     .getPropertyValue('--nav-width')
  //   //     .trim() === '250px'
  //   // ) {
  //   //   return;
  //   // }

  //   if (
  //     getComputedStyle(document.documentElement)
  //       .getPropertyValue('--pull-width')
  //       .trim() !== '0px'
  //   ) {
  //     document.documentElement.style.removeProperty('--pull-width');
  //   } else {
  //     document.documentElement.style.setProperty(
  //       '--pull-width',
  //       `${
  //         250 -
  //         Number(
  //           getComputedStyle(document.documentElement)
  //             .getPropertyValue('--nav-width')
  //             .trim()
  //             .substring(
  //               0,
  //               getComputedStyle(document.documentElement)
  //                 .getPropertyValue('--nav-width')
  //                 .trim().length - 2
  //             )
  //         )
  //       }px`
  //     );
  //   }
  // };

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
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a href="/" aria-label="Magnify" title="Magnify">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="school-outline" />
                </span>
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
                aria-label="About"
                title="About"
              >
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon
                    name="information-circle-outline"
                    aria-label="About"
                    title="About"
                  />
                </span>
                <span className="title">About</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="topbar">
          {/* Uncomment for navigation button */}
          {/* <div className="toggle" onClick={() => toggleNav()}>
            <ion-icon name="menu-outline" />
          </div> */}
          <div className="search">
            <i>
              {/* @ts-expect-error ts(2339) */}
              <ion-icon name="search-outline" />
            </i>
            <input
              id="searchbar"
              type="text"
              name="search"
              placeholder="Search for classes..."
            />
          </div>
          <button id="signer" className="login">
            {user ? 'Sign Out' : 'Login'}
          </button>
          {userElement}
        </div>
        <div className="tag-container">
          <button id="MAT" className="tag" onClick={() => toggleTag('MAT')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Math
          </button>
          <button id="ENG" className="tag" onClick={() => toggleTag('ENG')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            English
          </button>
          <button id="SOC" className="tag" onClick={() => toggleTag('SOC')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            History
          </button>
          <button id="SCI" className="tag" onClick={() => toggleTag('SCI')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Science
          </button>
          <button id="BUS" className="tag" onClick={() => toggleTag('BUS')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Business
          </button>
          <button id="ART" className="tag" onClick={() => toggleTag('ART')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Art
          </button>
          <button id="IND" className="tag" onClick={() => toggleTag('IND')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Trade
          </button>
          <button id="MUS" className="tag" onClick={() => toggleTag('MUS')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline" />
            Music
          </button>
        </div>
        <div id="course-container">{classItems}</div>
      </div>
      <div onClick={scrollToTop} id="to-top" className="jump-to-top">
        {/* @ts-expect-error ts(2339) */}
        <ion-icon name="chevron-up-outline" size="larger" />
      </div>
      <div className="mobile-bottom-nav">
        <div className="mobile-bottom-nav-container">
          <a
            href={links.programOfStudiesPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bottom-nav-button"
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon name="document-text-outline" />
            <span>PDF</span>
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-bottom-nav-button"
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon name="information-circle-outline" />
            <span>About</span>
          </a>
          <button onClick={scrollToTop} className="mobile-bottom-nav-button">
            {/* @ts-expect-error ts(2339) */}
            <ion-icon name="chevron-up-outline" size="larger" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

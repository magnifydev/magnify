import './App.css';
import userDefault from './assets/user.png';
import firebase from 'firebase/compat/app';
import { FC } from 'react';

interface AppProps {
  user: firebase.User | null;
  classItems: JSX.Element;
}

const App: FC<AppProps> = ({ user, classItems }) => {
  const tagToggle = (id: string): void => {
    const tag = document.getElementById(id);
    if (tag?.classList.contains('tag-true')) {
      tag.classList.remove('tag-true');
    } else {
      tag?.classList.add('tag-true');
    }
  };

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = (): void => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const toggleNav = (): void => {
    if (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-width')
        .trim() === '250px'
    ) {
      return;
    }

    if (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--pull-width')
        .trim() !== '0px'
    ) {
      document.documentElement.style.removeProperty('--pull-width');
    } else {
      document.documentElement.style.setProperty(
        '--pull-width',
        `${
          250 -
          Number(
            getComputedStyle(document.documentElement)
              .getPropertyValue('--nav-width')
              .trim()
              .substring(
                0,
                getComputedStyle(document.documentElement)
                  .getPropertyValue('--nav-width')
                  .trim().length - 2
              )
          )
        }px`
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="school-outline"></ion-icon>
                </span>
                <span className="title">Magnify</span>
              </a>
            </li>
            <li className="hovered">
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="search-outline"></ion-icon>
                </span>
                <span className="title">Search All</span>
              </a>
            </li>
            <li>
              <a href="https://cdn.linnmar.k12.ia.us/wp-content/uploads/2016/11/2022-2023-LMHS-Program-of-Studies-FINAL2-1.pdf">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="document-text-outline"></ion-icon>
                </span>
                <span className="title">PDF</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="earth-outline"></ion-icon>
                </span>
                <span className="title">History</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="brush-outline"></ion-icon>
                </span>
                <span className="title">Art</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="flask"></ion-icon>
                </span>
                <span className="title">Science</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="musical-notes-outline"></ion-icon>
                </span>
                <span className="title">Music</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="business-outline"></ion-icon>
                </span>
                <span className="title">Business</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="icon">
                  {/* @ts-expect-error ts(2339) */}
                  <ion-icon name="construct-outline"></ion-icon>
                </span>
                <span className="title">Trade</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle" onClick={() => toggleNav()}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon name="menu-outline"></ion-icon>
          </div>
          <div className="search">
            <label>
              <input
                id="searchbar"
                type="text"
                name="search"
                placeholder="Search for classes..."
              ></input>
              {/* @ts-expect-error ts(2339) */}
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <button id="signer" className="login">
            {user ? 'Sign Out' : 'Login'}
          </button>

          <div className="user">
            <img
              id="user-img"
              src={user && user.photoURL ? user.photoURL : userDefault}
              alt="User profile"
            ></img>
          </div>
        </div>
        <div className="tag-container">
          <button id="MAT" className="tag" onClick={() => tagToggle('MAT')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>Math
          </button>
          <button id="ENG" className="tag" onClick={() => tagToggle('ENG')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>English
          </button>
          <button id="SOC" className="tag" onClick={() => tagToggle('SOC')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>History
          </button>
          <button id="SCI" className="tag" onClick={() => tagToggle('SCI')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>Science
          </button>
          <button id="BUS" className="tag" onClick={() => tagToggle('BUS')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>Business
          </button>
          <button id="ART" className="tag" onClick={() => tagToggle('ART')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>Art
          </button>
          <button id="IND" className="tag" onClick={() => tagToggle('IND')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>Trade
          </button>
          <button id="MUS" className="tag" onClick={() => tagToggle('MUS')}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon class="hide" name="checkmark-outline"></ion-icon>Music
          </button>
        </div>
        <div id="course-container">{classItems}</div>
      </div>
      <div onClick={topFunction} id="to-top" className="jump-to-top">
        {/* @ts-expect-error ts(2339) */}
        <ion-icon name="chevron-up-outline" size="larger"></ion-icon>
      </div>
    </div>
  );
};

export default App;

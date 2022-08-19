import '../App.css';
import firebase from 'firebase/compat/app';
import { FC } from 'react';

interface TopBarProps {
  user: firebase.User | null;
  userElement: JSX.Element;
}

export const TopBar: FC<TopBarProps> = ({ user, userElement }): JSX.Element => {
  return (
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
  );
};

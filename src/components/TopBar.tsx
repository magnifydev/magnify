import '../App.css';
import firebase from 'firebase/compat/app';
import { FC } from 'react';

interface TopBarProps {
  user: firebase.User | null;
  userElement: JSX.Element;
  searchQuery: string;
  onSearch: (query: string) => void;
  onSignIn: () => void;
}

export const TopBar: FC<TopBarProps> = ({
  user,
  userElement,
  searchQuery,
  onSearch,
  onSignIn,
}): JSX.Element => {
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
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <button type="button" id="signer" className="login" onClick={onSignIn}>
        {user ? 'Sign Out' : 'Login'}
      </button>
      {userElement}
    </div>
  );
};

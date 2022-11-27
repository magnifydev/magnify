import '../App.css';
import { CSSProperties, FC } from 'react';
import { BarLoader } from 'react-spinners';

const override: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export const Loader: FC = (): JSX.Element => {
  return (
    <div className="loader">
      <BarLoader
        color={'#fff'}
        cssOverride={override}
        aria-label="Loading Bar"
      />
    </div>
  );
};

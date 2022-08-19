import '../App.css';
import { scrollToTop } from '../utils';
import { FC } from 'react';

interface FloatingActionableProps {
  handleContactModalOpen: () => void;
}

export const FloatingActionable: FC<FloatingActionableProps> = ({
  handleContactModalOpen,
}): JSX.Element => {
  return (
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
  );
};

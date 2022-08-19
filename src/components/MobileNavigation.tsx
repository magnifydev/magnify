import '../App.css';
import { links } from '../data';
import { scrollToTop } from '../utils';
import { FC } from 'react';

interface MobileNavigationProps {
  handleContactModalOpen: () => void;
}

export const MobileNavigation: FC<MobileNavigationProps> = ({
  handleContactModalOpen,
}): JSX.Element => {
  return (
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
  );
};

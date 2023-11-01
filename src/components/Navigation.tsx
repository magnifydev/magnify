import '../App.css';
import { links } from '../data';
import { FC, useCallback } from 'react';

interface NavigationProps {
  authLevel: number;
}

export const Navigation: FC<NavigationProps> = ({ authLevel }): JSX.Element => {
  const handleParseModalOpen = useCallback(() => {
    const parseModal = document.getElementById(
      'parse-modal'
    ) as HTMLDialogElement;
    parseModal?.parentElement?.classList.remove('hide');
    parseModal?.showModal();
  }, []);

  return (
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
              <ion-icon name="logo-github" aria-label="GitHub" title="GitHub" />
            </span>
            <span className="title">GitHub</span>
          </a>
        </li>
        {authLevel === 5 && (
          <li>
            <button
              aria-label="Parse PDF"
              title="Parse PDF"
              onClick={handleParseModalOpen}
            >
              <span className="icon">
                {/* @ts-expect-error ts(2339) */}
                <ion-icon name="cloud-upload-outline" />
              </span>
              <span className="title">Parse PDF</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

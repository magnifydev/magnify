import '../App.css';
import { getWidth } from '../utils';
import { FC, useEffect } from 'react';

interface ClearFilterProps {
  onClearFilters: () => void;
}

export const ClearFilter: FC<ClearFilterProps> = ({ onClearFilters }): JSX.Element => {
  useEffect(() => {
    const courseContainer = document.getElementById(
      'course-container'
    ) as HTMLDivElement;

    const adjustHeight = () => {
      courseContainer.style.height =
        getWidth() >= 525
          ? 'calc(100vh - 180px)'
          : 'calc(100vh - (45.5px + 65.5px + (clamp(15px, 5vw, 20px) * 2)))';
    };

    adjustHeight();
    window.addEventListener('resize', adjustHeight);
    return () => {
      window.removeEventListener('resize', adjustHeight);
      courseContainer.style.height = '';
    };
  }, []);

  return (
    <div className="ClearFilter" id="clear-filter-class">
      <h1>No Results</h1>
      <button className="clear-results" onClick={onClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

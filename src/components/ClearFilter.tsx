import '../App.css';
import { filterCourses } from '../index';
import { FC } from 'react';

export const ClearFilter: FC = (): JSX.Element => {
  const courseContainer = document.getElementById(
    'course-container'
  ) as HTMLDivElement;
  courseContainer.style.display = 'flex';
  courseContainer.style.justifyContent = 'center';

  const clearResults = () => {
    const search = document.getElementById('searchbar') as HTMLInputElement;
    search.value = '';

    const tags = document.getElementsByClassName('tag');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        tags[i].classList.remove('tag-true');
      }
    }

    courseContainer.style.display = '';
    courseContainer.style.justifyContent = '';

    filterCourses();
  };

  return (
    <div className="ClearFilter" id="clear-filter-class">
      <h1>No Results</h1>
      <button className="clear-results" onClick={clearResults}>
        Clear Filters
      </button>
    </div>
  );
};

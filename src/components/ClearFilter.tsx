import '../App.css';
import { filterCourses } from '../index';
import { getWidth } from '../utils';
import { FC } from 'react';

export const ClearFilter: FC = (): JSX.Element => {
  const courseContainer = document.getElementById(
    'course-container'
  ) as HTMLDivElement;
  courseContainer.style.display = 'flex';
  courseContainer.style.justifyContent = 'center';

  const adjustCourseContainerHeight = () => {
    if (getWidth() >= 525) {
      courseContainer.style.height = 'calc(100vh - 180px)';
    } else {
      courseContainer.style.height =
        'calc(100vh - (45.5px + 65.5px + (clamp(15px, 5vw, 20px) * 2)))';
    }
  };

  adjustCourseContainerHeight();
  window.addEventListener('resize', adjustCourseContainerHeight);

  const clearResults = () => {
    const search = document.getElementById('searchbar') as HTMLInputElement;
    search.value = '';

    const tags = document.getElementsByClassName('tag');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        tags[i].classList.remove('tag-true');
      }
    }

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

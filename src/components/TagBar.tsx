import '../App.css';
import { FC, useCallback } from 'react';

const TAGS = [
  { id: 'ADP', label: 'AP' },
  { id: 'ENG', label: 'English' },
  { id: 'FOR', label: 'Foreign Language' },
  { id: 'MAT', label: 'Math' },
  { id: 'SCI', label: 'Science' },
  { id: 'SOC', label: 'Social Studies' },
  { id: 'ART', label: 'Art' },
  { id: 'MUS', label: 'Music' },
  { id: 'HPE', label: 'Health/PE' },
  { id: 'AGR', label: 'Agriculture' },
  { id: 'BUS', label: 'Business' },
  { id: 'CSC', label: 'Computer Science' },
  { id: 'IND', label: 'Engineering' },
  { id: 'FAM', label: 'FCS' },
  { id: 'TAG', label: 'TAG' },
  { id: 'VEN', label: 'Venture' },
] as const;

export const TagBar: FC = (): JSX.Element => {
  const handleTagToggle = useCallback((id: string): void => {
    document.getElementById(id)?.classList.toggle('tag-true');
  }, []);

  const handleTagTrueRemove = useCallback(() => {
    const tags = document.getElementsByClassName('tag');
    for (let i = 0; i < tags.length; i++) {
      tags[i].classList.remove('tag-true');
    }
  }, []);

  return (
    <div className="tag-container">
      <button
        type="button"
        id="ALL"
        className="tag tag-all"
        onClick={handleTagTrueRemove}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        All
      </button>

      {TAGS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          id={id}
          className="tag"
          onClick={() => handleTagToggle(id)}
        >
          {/* @ts-expect-error ts(2339) */}
          <ion-icon class="hide" name="checkmark-outline" />
          {label}
        </button>
      ))}
    </div>
  );
};

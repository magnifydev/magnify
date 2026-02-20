import '../App.css';
import { FC } from 'react';

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

interface TagBarProps {
  activeTags: string[];
  onTagToggle: (id: string) => void;
  onClearTags: () => void;
}

export const TagBar: FC<TagBarProps> = ({ activeTags, onTagToggle, onClearTags }): JSX.Element => {
  return (
    <div className="tag-container">
      <button
        type="button"
        id="ALL"
        className={`tag ${activeTags.length === 0 ? 'tag-all' : ''}`}
        onClick={onClearTags}
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
          className={`tag ${activeTags.includes(id) ? 'tag-true' : ''}`}
          onClick={() => onTagToggle(id)}
        >
          {/* @ts-expect-error ts(2339) */}
          <ion-icon class="hide" name="checkmark-outline" />
          {label}
        </button>
      ))}
    </div>
  );
};

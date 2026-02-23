import '../App.css';
import { TAGS } from '../data';
import { FC } from 'react';

interface TagBarProps {
  activeTags: string[];
  onTagToggle: (id: string) => void;
  onClearTags: () => void;
}

export const TagBar: FC<TagBarProps> = ({
  activeTags,
  onTagToggle,
  onClearTags,
}): JSX.Element => {
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

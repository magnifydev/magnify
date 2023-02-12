import '../App.css';
import { FC, useCallback } from 'react';

export const TagBar: FC = (): JSX.Element => {
  const handleTagToggle = (id: string): void => {
    const tag = document.getElementById(id);
    tag?.classList.toggle('tag-true');
  };

  const handleTagTrueRemove = useCallback(() => {
    const tags = document.getElementsByClassName('tag');
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].classList.contains('tag-true')) {
        tags[i].classList.remove('tag-true');
      }
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
      <button
        type="button"
        id="ADP"
        className="tag"
        onClick={useCallback(() => handleTagToggle('ADP'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        AP
      </button>
      <button
        type="button"
        id="AGR"
        className="tag"
        onClick={useCallback(() => handleTagToggle('AGR'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Agriculture
      </button>
      <button
        type="button"
        id="ART"
        className="tag"
        onClick={useCallback(() => handleTagToggle('ART'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Art
      </button>
      <button
        type="button"
        id="BUS"
        className="tag"
        onClick={useCallback(() => handleTagToggle('BUS'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Business
      </button>
      <button
        type="button"
        id="IND"
        className="tag"
        onClick={useCallback(() => handleTagToggle('IND'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Engineering
      </button>
      <button
        type="button"
        id="ENG"
        className="tag"
        onClick={useCallback(() => handleTagToggle('ENG'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        English
      </button>
      <button
        type="button"
        id="FAM"
        className="tag"
        onClick={useCallback(() => handleTagToggle('FAM'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        FCS
      </button>
      <button
        type="button"
        id="FOR"
        className="tag"
        onClick={useCallback(() => handleTagToggle('FOR'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Foreign Language
      </button>
      <button
        type="button"
        id="HPE"
        className="tag"
        onClick={useCallback(() => handleTagToggle('HPE'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Health/PE
      </button>
      <button
        type="button"
        id="MAT"
        className="tag"
        onClick={useCallback(() => handleTagToggle('MAT'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Math
      </button>
      <button
        type="button"
        id="MUS"
        className="tag"
        onClick={useCallback(() => handleTagToggle('MUS'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Music
      </button>
      <button
        type="button"
        id="SCI"
        className="tag"
        onClick={useCallback(() => handleTagToggle('SCI'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Science
      </button>
      <button
        type="button"
        id="SOC"
        className="tag"
        onClick={useCallback(() => handleTagToggle('SOC'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Social Studies
      </button>
      <button
        type="button"
        id="TAG"
        className="tag"
        onClick={useCallback(() => handleTagToggle('TAG'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        TAG
      </button>
      <button
        type="button"
        id="VEN"
        className="tag"
        onClick={useCallback(() => handleTagToggle('VEN'), [])}
      >
        {/* @ts-expect-error ts(2339) */}
        <ion-icon class="hide" name="checkmark-outline" />
        Venture
      </button>
    </div>
  );
};

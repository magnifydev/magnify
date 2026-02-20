import '../App.css';
import { db } from '../config';
import { CourseType } from '../types';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

interface CourseEditModalProps {
  course: CourseType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string, updated: CourseType) => void;
}

interface LabeledFieldProps {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}

const LabeledField: FC<LabeledFieldProps> = ({ label, full, children }) => (
  <div className={`edit-modal-field${full ? ' edit-modal-field--full' : ''}`}>
    <span className="edit-modal-label">{label}</span>
    {children}
  </div>
);

export const CourseEditModal: FC<CourseEditModalProps> = ({
  course,
  isOpen,
  onClose,
  onSave,
}): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<CourseType>(course);

  // Sync draft and open/close the native <dialog> when isOpen changes
  useEffect(() => {
    if (isOpen) {
      setDraft({ ...course });
      wrapperRef.current?.classList.remove('hide');
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      wrapperRef.current?.classList.add('hide');
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, course]);

  const set = useCallback((field: keyof CourseType, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value || undefined }));
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const key = course.coursename.toLowerCase().replaceAll(' ', '-');
      const merged = { ...course, ...draft };
      // Firebase rejects undefined values; omit keys that were cleared
      const updated = Object.fromEntries(
        Object.entries(merged).filter(([, v]) => v !== undefined)
      ) as unknown as CourseType;
      db.ref('courses').update({ [key]: updated });
      onSave(key, updated);
      onClose();
    },
    [course, draft, onSave, onClose]
  );

  return (
    <div ref={wrapperRef} className="Contact hide">
      <dialog ref={dialogRef} className="modal edit-modal" onClose={onClose} onClick={handleBackdropClick}>
        <div className="edit-modal-header">
          <h1>Edit Course</h1>
          <button type="button" className="edit-modal-close" onClick={onClose}>
            {/* @ts-expect-error ts(2339) */}
            <ion-icon name="close-outline" />
          </button>
        </div>
        <form className="edit-modal-form" onSubmit={handleSubmit}>

          <LabeledField label="Course Name" full>
            <input
              className="edit-modal-input"
              value={draft.coursename}
              onChange={(e) => set('coursename', e.target.value)}
              required
            />
          </LabeledField>

          <LabeledField label="Course ID">
            <input
              className="edit-modal-input"
              value={draft.courseid}
              onChange={(e) => set('courseid', e.target.value)}
              required
            />
          </LabeledField>

          <LabeledField label="Grade Levels">
            <input
              className="edit-modal-input"
              value={draft.gradelevels}
              onChange={(e) => set('gradelevels', e.target.value)}
              required
            />
          </LabeledField>

          <LabeledField label="Credits">
            <input
              className="edit-modal-input"
              value={draft.credits}
              onChange={(e) => set('credits', e.target.value)}
              required
            />
          </LabeledField>

          <LabeledField label="Length">
            <input
              className="edit-modal-input"
              value={draft.length}
              onChange={(e) => set('length', e.target.value)}
              required
            />
          </LabeledField>

          <LabeledField label="Format">
            <input
              className="edit-modal-input"
              value={draft.format ?? ''}
              onChange={(e) => set('format', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Fees">
            <input
              className="edit-modal-input"
              value={draft.fees ?? ''}
              onChange={(e) => set('fees', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Prerequisites" full>
            <input
              className="edit-modal-input"
              value={draft.prerequisites ?? ''}
              onChange={(e) => set('prerequisites', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Corequisites">
            <input
              className="edit-modal-input"
              value={draft.corequisite ?? ''}
              onChange={(e) => set('corequisite', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Subsequent">
            <input
              className="edit-modal-input"
              value={draft.subsequent ?? ''}
              onChange={(e) => set('subsequent', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Considerations" full>
            <textarea
              className="edit-modal-textarea"
              value={draft.considerations ?? ''}
              onChange={(e) => set('considerations', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Courses" full>
            <input
              className="edit-modal-input"
              value={draft.courses ?? ''}
              onChange={(e) => set('courses', e.target.value)}
            />
          </LabeledField>

          <LabeledField label="Description" full>
            <textarea
              className="edit-modal-textarea"
              value={draft.description}
              onChange={(e) => set('description', e.target.value)}
              required
            />
          </LabeledField>

          <div className="flex-container modal-button-container edit-modal-field--full">
            <button type="button" onClick={onClose} className="modal-cancel">
              Cancel
            </button>
            <button type="submit" className="modal-send">
              Save
            </button>
          </div>

        </form>
      </dialog>
    </div>
  );
};

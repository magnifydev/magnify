import '../App.css';
import { CourseEditModal } from './CourseEditModal';
import { CourseType } from '../types';
import React, { FC, useCallback, useState } from 'react';

interface CourseProps {
  course: CourseType;
  authLevel: number;
  jumpId: string;
  courseIDtoCourse: (id: string) => CourseType;
  onCourseUpdate: (key: string, updated: CourseType) => void;
}

export const Course: FC<CourseProps> = ({
  course,
  authLevel,
  jumpId,
  courseIDtoCourse,
  onCourseUpdate,
}): JSX.Element => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDescriptionCollapse = useCallback(
    (btn: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      btn.currentTarget.classList.toggle('active');
      const content = btn.currentTarget.nextElementSibling as HTMLElement;
      if (content.style.maxHeight) {
        btn.currentTarget.innerHTML = 'See More';
        content.style.removeProperty('max-height');
      } else {
        btn.currentTarget.innerHTML = 'See Less';
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    },
    []
  );

  const handleJumpIdButton = useCallback(() => {
    window.location.hash = jumpId;
    navigator.clipboard.writeText(window.location.href);
  }, [jumpId]);

  const isVenture = course.coursename.includes('Venture');

  const Style = {
    gridRow: `span ${course.courses?.match(/[A-Z][A-Z][A-Z][0-9][0-9][0-9]/gm)?.length ?? 1
      }`,
    backgroundColor: isVenture ? 'var(--primary-light)' : '',
  };

  return (
    <>
      <CourseEditModal
        course={course}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={onCourseUpdate}
      />

      <div className="Course" id={jumpId} style={Style}>
        <h1 className="course-title">{course.coursename}</h1>
        <br />
        <p className="course-description">
          <b>Credits: </b>
          {course.credits}
        </p>
        <p className="course-description">
          <b>Length: </b>
          {course.length}
        </p>
        <p className="course-description">
          <b>Format: </b>
          {course.format}
        </p>
        <p className="course-description">
          <b>Course ID: </b>
          {course.courseid}
        </p>
        <p className="course-description">
          <b>Grade Levels: </b>
          {course.gradelevels}
        </p>
        <br />
        {course.prerequisites && (
          <>
            <p className="course-description">
              <b>Prerequisites: </b>
              {course.prerequisites}
            </p>
            <br />
          </>
        )}
        {course.fees && (
          <p className="course-description">
            <b>Fees: </b>
            {course.fees}
          </p>
        )}
        {course.corequisite && (
          <>
            <p className="course-description">
              <b>Corequisites: </b>
              {course.corequisite}
            </p>
            <br />
          </>
        )}
        {course.subsequent && (
          <>
            <p className="course-description">
              <b>Subsequent: </b>
              {course.subsequent}
            </p>
            <br />
          </>
        )}
        {course.considerations && (
          <>
            <p className="course-description">
              <b>Considerations: </b>
              {course.considerations}
            </p>
            <br />
          </>
        )}
        {course.courses && (
          <>
            <p className="course-description">
              <b>Courses: </b>
              {course.courses}
            </p>
            {course.courses
              .match(/[A-Z][A-Z][A-Z][0-9][0-9][0-9]/gm)
              ?.filter((id) => courseIDtoCourse(id))
              .map((id) => (
                <React.Fragment key={id}>
                  <br />
                  <Course
                    authLevel={authLevel}
                    course={courseIDtoCourse(id)}
                    jumpId={id}
                    courseIDtoCourse={courseIDtoCourse}
                    onCourseUpdate={onCourseUpdate}
                  />
                </React.Fragment>
              ))}
            <br />
          </>
        )}
        <button
          type="button"
          className="collapsible"
          onClick={handleDescriptionCollapse}
        >
          See More
        </button>
        <p className="course-description content-collapsible">
          {course.description}
        </p>
        {authLevel === 5 && (
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="edit"
          >
            {/* @ts-expect-error ts(2339) */}
            <ion-icon name="create-outline" />
          </button>
        )}
        <button
          type="button"
          onClick={handleJumpIdButton}
          className="jump-id-button"
        >
          {/* @ts-expect-error ts(2339) */}
          <ion-icon name="link-outline" />
        </button>
      </div>
    </>
  );
};

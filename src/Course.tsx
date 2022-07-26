import './App.css';
import { firebaseConfig } from './config';
import { CourseType } from './types';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { FC, useCallback, useRef, useState, useMemo } from 'react';

firebase.initializeApp(firebaseConfig);
firebase.database().ref();

interface CourseProps {
  course: CourseType;
  authLevel: number;
}

const Course: FC<CourseProps> = ({ course, authLevel }): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  const credits = useRef<HTMLParagraphElement>(null);
  const length = useRef<HTMLParagraphElement>(null);
  const format = useRef<HTMLParagraphElement>(null);
  const courseid = useRef<HTMLParagraphElement>(null);
  const gradelevels = useRef<HTMLParagraphElement>(null);
  const prerequisites = useRef<HTMLParagraphElement>(null);
  const fees = useRef<HTMLParagraphElement>(null);
  const corequisite = useRef<HTMLParagraphElement>(null);
  const subsequent = useRef<HTMLParagraphElement>(null);
  const considerations = useRef<HTMLParagraphElement>(null);
  const description = useRef<HTMLParagraphElement>(null);

  // Uncomment for student recommendations
  // const studentrecommendations = useRef<HTMLParagraphElement>(null);

  const refs = useMemo(
    () => ({
      credits,
      length,
      format,
      courseid,
      gradelevels,
      prerequisites,
      fees,
      corequisite,
      subsequent,
      considerations,
      description,
    }),
    [
      credits,
      length,
      format,
      courseid,
      gradelevels,
      prerequisites,
      fees,
      corequisite,
      subsequent,
      considerations,
      description,
    ]
  );

  const toggleCollapse = useCallback(
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

  const edit = useCallback(
    (btn: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      btn.currentTarget.classList.toggle('hide');
      setIsEditing(true);
    },
    []
  );

  const cancel = useCallback(() => setIsEditing(false), []);

  const submit = useCallback(() => {
    const loopName = course.coursename.toLowerCase().replaceAll(' ', '-');

    const isValidKey = (key: string): key is keyof typeof refs => {
      return key in refs;
    };

    const overwriteCourse = Object.fromEntries(
      Object.keys(course)
        .filter(isValidKey)
        .map((key) => {
          if (key === 'description') {
            const textContent = refs[key].current?.childNodes[0].textContent;
            return [key, textContent ? textContent : course[key]];
          } else {
            const textContent =
              refs[key].current?.childNodes[1].textContent?.trim();
            return [key, textContent ? textContent : course[key]];
          }
        })
    );

    firebase
      .database()
      .ref('courses')
      .update({
        [loopName]: { ...course, ...overwriteCourse },
      });

    // Note: introduce student comments with this: studentrecommendations: parseInt(studentrecommendations.current.childNodes[1].wholeText.trim()),

    // Exit the edit menu
    setIsEditing(false);
  }, [course, refs]);

  return (
    <div suppressContentEditableWarning className="Course">
      <h1 className="course-title">{course.coursename}</h1>
      <br />
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.credits}
        className="course-description"
      >
        <b contentEditable={false}>Credits: </b>
        {course.credits}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.length}
        className="course-description"
      >
        <b contentEditable={false}>Length: </b>
        {course.length}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.format}
        className="course-description"
      >
        <b contentEditable={false}>Format: </b>
        {course.format}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.courseid}
        className="course-description"
      >
        <b contentEditable={false}>Course ID: </b>
        {course.courseid}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.gradelevels}
        className="course-description"
      >
        <b contentEditable={false}>Grade Levels: </b>
        {course.gradelevels}
      </p>
      <br />
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.prerequisites}
        className="course-description"
      >
        <b contentEditable={false}>Prerequisites: </b>
        {course.prerequisites}
      </p>
      <br />
      {course.fees && (
        <p
          suppressContentEditableWarning
          contentEditable={isEditing}
          ref={refs.fees}
          className="course-description"
        >
          <b contentEditable={false}>Fees: </b>
          {course.fees}
        </p>
      )}
      {course.corequisite && (
        <div>
          <p
            suppressContentEditableWarning
            contentEditable={isEditing}
            ref={refs.corequisite}
            className="course-description"
          >
            <b contentEditable={false}>Corequisites: </b>
            {course.corequisite}
          </p>
          <br />
        </div>
      )}
      {course.subsequent && (
        <div>
          <p
            suppressContentEditableWarning
            contentEditable={isEditing}
            ref={refs.subsequent}
            className="course-description"
          >
            <b contentEditable={false}>Subsequent: </b>
            {course.subsequent}
          </p>
          <br />
        </div>
      )}
      {/* Uncomment for student recommendations */}
      {/* {course.studentrecommendations && (
        <div>
          <p
            suppressContentEditableWarning={true}
            contentEditable={isEditing}
            ref={refs.studentrecommendations}
            className="course-description"
          >
            <b contentEditable={false}>Recommendation:</b>{' '}
            {course.studentrecommendations}
          </p>
          <br />
        </div>
      )} */}
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.considerations}
        className="course-description"
      >
        <b contentEditable={false}>Considerations: </b>
        {course.considerations}
      </p>
      <br />
      <button type="button" className="collapsible" onClick={toggleCollapse}>
        See More
      </button>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.description}
        className="course-description content-collapsible"
      >
        {course.description}
      </p>
      <div className="flex-container">
        {isEditing && (
          <button type="button" onClick={cancel} className="button">
            Cancel
          </button>
        )}
        {isEditing && (
          <button type="button" onClick={submit} className="button-primary">
            Submit
          </button>
        )}
      </div>
      {authLevel === 5 && !isEditing && (
        <button onClick={edit} className="edit">
          {/* @ts-expect-error ts(2339) */}
          <ion-icon name="create-outline" />
        </button>
      )}
    </div>
  );
};

export default Course;

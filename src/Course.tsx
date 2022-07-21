import './App.css';
import firebaseConfig from './config/firebase';
import CourseType from './types/courseType';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { FC, useRef, useState } from 'react';

firebase.initializeApp(firebaseConfig);
firebase.database().ref();

interface CourseProps {
  course: CourseType;
  authLevel: number;
}

const Course: FC<CourseProps> = ({ course, authLevel }): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  interface ReferenceTypes extends Omit<CourseType, 'coursename' | 'tags'> {
    credits: string;
    length: string;
    format: string;
    courseid: string;
    gradelevels: string;
    prerequisites: string;
    fees: string;
    corequisite: string;
    subsequent: string;
    considerations: string;
    description: string;
  }

  const refs = {
    credits: useRef<HTMLParagraphElement>(null),
    length: useRef<HTMLParagraphElement>(null),
    format: useRef<HTMLParagraphElement>(null),
    courseid: useRef<HTMLParagraphElement>(null),
    gradelevels: useRef<HTMLParagraphElement>(null),
    prerequisites: useRef<HTMLParagraphElement>(null),
    fees: useRef<HTMLParagraphElement>(null),
    corequisite: useRef<HTMLParagraphElement>(null),
    subsequent: useRef<HTMLParagraphElement>(null),
    studentrecommendations: useRef<HTMLParagraphElement>(null),
    considerations: useRef<HTMLParagraphElement>(null),
    description: useRef<HTMLParagraphElement>(null),
  };

  // Add collapse
  const toggleCollapse = (
    btn: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    btn.currentTarget.classList.toggle('active');
    const content = btn.currentTarget.nextElementSibling as HTMLElement;
    if (content.style.maxHeight) {
      btn.currentTarget.innerHTML = 'See more';
      content.style.removeProperty('max-height');
    } else {
      btn.currentTarget.innerHTML = 'See less';
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  };

  const edit = (btn: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    btn.currentTarget.classList.toggle('hide');
    setIsEditing(true);
  };

  const cancel = () => setIsEditing(false);

  const submit = () => {
    const newCourse: { [key: string]: ReferenceTypes } = {};
    const loopName = course.coursename.toLowerCase().replaceAll(' ', '-');

    const isValidTagKey = (
      keys: string
    ): keys is keyof typeof newCourse[typeof loopName] => {
      return keys in newCourse[loopName];
    };

    Object.keys(course).forEach((key) => {
      try {
        if (key === 'description') {
          // console.log(refs[key].current.childNodes[0].textContent);
          const textContent = refs[key].current?.childNodes[0].textContent;
          if (!textContent) throw new Error('No text content');
          newCourse[loopName][key] = textContent;
        } else {
          // console.log(`${refs[key].current.childNodes[1].wholeText.trim()}`);
          if (!isValidTagKey(key)) throw new Error('Invalid tag key');
          const childNode =
            refs[key].current?.childNodes[1].textContent?.trim();
          if (!childNode) throw new Error('No first child node');
          newCourse[loopName][key] = childNode;
        }
      } catch {
        if (!isValidTagKey(key)) throw new Error('Invalid tag key');
        const courseKey = course[key];
        if (!courseKey) throw new Error('No course key');
        newCourse[loopName][key] = courseKey;
      }
    });

    firebase
      .database()
      .ref(`courses`)
      .update({
        [loopName]: newCourse[loopName],
      });

    // Note: introduce student comments with this: studentrecommendations: parseInt(studentrecommendations.current.childNodes[1].wholeText.trim()),

    // Exit the edit menu
    setIsEditing(false);
  };

  return (
    <div suppressContentEditableWarning={true} className="Course">
      <h1 className="coursetitle">{course.coursename}</h1>
      <br />
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.credits}
        className="coursedescription"
      >
        <b contentEditable={false}>Credits:</b> {course.credits}
      </p>
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.length}
        className="coursedescription"
      >
        <b contentEditable={false}>Length:</b> {course.length}
      </p>
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.format}
        className="coursedescription"
      >
        <b contentEditable={false}>Format:</b> {course.format}
      </p>
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.courseid}
        className="coursedescription"
      >
        <b contentEditable={false}>Course ID:</b> {course.courseid}
      </p>
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.gradelevels}
        className="coursedescription"
      >
        <b contentEditable={false}>Grade Levels:</b> {course.gradelevels}
      </p>
      <br />
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.prerequisites}
        className="coursedescription"
      >
        <b contentEditable={false}>Prerequisites:</b> {course.prerequisites}
      </p>
      <br />
      {course.fees && (
        <p
          suppressContentEditableWarning={true}
          contentEditable={isEditing}
          ref={refs.fees}
          className="coursedescription"
        >
          <b contentEditable={false}>Fees:</b> {course.fees}
        </p>
      )}
      {course.corequisite && (
        <div>
          <p
            suppressContentEditableWarning={true}
            contentEditable={isEditing}
            ref={refs.corequisite}
            className="coursedescription"
          >
            <b contentEditable={false}>Corequisites:</b> {course.corequisite}
          </p>
          <br />
        </div>
      )}
      {course.subsequent && (
        <div>
          <p
            suppressContentEditableWarning={true}
            contentEditable={isEditing}
            ref={refs.subsequent}
            className="coursedescription"
          >
            <b contentEditable={false}>Subsequent:</b> {course.subsequent}
          </p>
          <br />
        </div>
      )}
      {/* {course.studentrecommendations && (
        <div>
          <p
            suppressContentEditableWarning={true}
            contentEditable={isEditing}
            ref={refs.studentrecommendations}
            className="coursedescription"
          >
            <b contentEditable={false}>Recommendation:</b>{' '}
            {course.studentrecommendations}
          </p>
          <br />
        </div>
      )} */}
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.considerations}
        className="coursedescription"
      >
        <b contentEditable={false}>Considerations:</b> {course.considerations}
      </p>
      <br />
      <button className="collapsible" onClick={toggleCollapse}>
        See more
      </button>
      <p
        suppressContentEditableWarning={true}
        contentEditable={isEditing}
        ref={refs.description}
        className="coursedescription content-collapsible"
      >
        {course.description}
      </p>
      <div className="flex-container">
        {isEditing && (
          <button onClick={cancel} className="button">
            Cancel
          </button>
        )}
        {isEditing && (
          <button onClick={submit} className="button-primary">
            Submit
          </button>
        )}
      </div>
      {authLevel === 5 && !isEditing && (
        /* @ts-expect-error ts(2339) */
        <ion-icon onClick={edit} class="edit" name="pencil-outline" />
      )}
    </div>
  );
};

export default Course;

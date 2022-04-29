import React, { useRef, useState } from 'react';
import './App.css';
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyB7xPx53G2Q39jxMghxSN2P1vaf0YjukwE",
    authDomain: "courseinspector.firebaseapp.com",
    databaseURL: "https://courseinspector-default-rtdb.firebaseio.com",
    projectId: "courseinspector",
    storageBucket: "courseinspector.appspot.com",
    messagingSenderId: "714692191382",
    appId: "1:714692191382:web:3d52f73c4d534ee5f6ceb7",
    measurementId: "G-NJ5MX0KYYK"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Set data to realtime database
const dbRef = firebase.database().ref();

function Course(props) {
    const course = props.course;
    const authlevel = props.authlevel ? props.authlevel : 0;
    const [isEditing, setIsEditing] = useState(false);

    const credits = useRef(null);
    const length = useRef(null);
    const format = useRef(null);
    const courseid = useRef(null);
    const gradelevels = useRef(null);
    const prerequisites = useRef(null);
    const fees = useRef(null);
    const corequisites = useRef(null);
    const subsequent = useRef(null);
    const studentrecommendations = useRef(null);
    const considerations = useRef(null);
    const description = useRef(null);

    // Add collapse
    function ToggleCollapse(btn) {
        btn.classList.toggle("active");
        let content = btn.nextElementSibling;
        if (content.style.maxHeight) {
            btn.innerHTML = "See more";
            content.style.maxHeight = null;

        } else {
            btn.innerHTML = "See less";
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    function Edit(btn) {
        btn.target.classList.toggle("hide");
        setIsEditing(true);
    }

    function Cancel() {
        setIsEditing(false);
    }

    function Submit() {

        firebase.database().ref(`courses/${course.coursename.toLowerCase().replaceAll(' ', '-')}`).update({
            credits: parseInt(credits.current.childNodes[1].wholeText.trim()),
            length: parseInt(length.current.childNodes[1].wholeText.trim()),
            format: parseInt(format.current.childNodes[1].wholeText.trim()),
            courseid: parseInt(courseid.current.childNodes[1].wholeText.trim()),
            gradelevels: parseInt(gradelevels.current.childNodes[1].wholeText.trim()),
            prerequisites: parseInt(prerequisites.current.childNodes[1].wholeText.trim()),
            fees: parseInt(fees.current.childNodes[1].wholeText.trim()),
            corequisites: parseInt(corequisites.current.childNodes[1].wholeText.trim()),
            subsequent: parseInt(subsequent.current.childNodes[1].wholeText.trim()),
            considerations: parseInt(considerations.current.childNodes[1].wholeText.trim()),
            description: parseInt(description.current.childNodes[1].wholeText.trim()),
        });

        // Note: introduce student comments with this: studentrecommendations: parseInt(studentrecommendations.current.childNodes[1].wholeText.trim()),

        // Exit the edit menu
        setIsEditing(false);
    }

    function Validate(value) {
        if (value) {
            return value;
        } else {
            return -1;
        }
    }

    return (
        <div contentEditable={isEditing} suppressContentEditableWarning={true} className='Course'>
            <h1 className="coursetitle">{course.coursename}</h1><br></br>
            <p ref={credits} className="coursedescription"><b>Credits:</b> {course.credits}</p>
            <p ref={length} className="coursedescription"><b>Length:</b> {course.length}</p>
            <p ref={format} className="coursedescription"><b>Format:</b> {course.format}</p>
            <p ref={courseid} className="coursedescription"><b>Course ID:</b> <code>{course.courseid}</code></p>
            <p ref={gradelevels} className="coursedescription"><b>Grade Levels:</b> {course.gradelevels}</p><br></br>
            <p ref={prerequisites} className="coursedescription"><b>Prerequisites:</b> {course.prerequisites}</p><br></br>
            {course.fees != null && <p ref={fees} className="coursedescription"><b>Fees:</b> {course.fees}</p>}
            {course.corequisite != null && <div><p ref={corequisites} className="coursedescription"><b>Corequisites:</b> {course.corequisite}</p><br></br></div>}
            {course.subsequent != null && <div><p ref={subsequent} className="coursedescription"><b>Subsequent:</b> {course.subsequent}</p><br></br></div>}
            {course.studentrecommendations != null && <div><p ref={studentrecommendations} className="coursedescription"><b>Recommendation:</b> {course.studentrecommendations}</p><br></br></div>}
            <p ref={considerations} className="coursedescription"><b>Considerations:</b> {course.considerations}</p><br></br>
            <button className="collapsible" onClick={({ target }) => ToggleCollapse(target)}>See more</button>
            <p ref={description} className="coursedescription content-collapsible">{course.description}</p><br></br>
            <div className="flex-container">
                {isEditing && <button onClick={() => Cancel()} className="button">Cancel</button>}
                {isEditing && <button onClick={() => Submit()} className="button-primary">Submit</button>}
            </div>
            {(authlevel === 5 && !isEditing) && <ion-icon onClick={(btn) => Edit(btn)} class="edit" name="pencil-outline"></ion-icon>}
        </div>
    );
}

export default Course;
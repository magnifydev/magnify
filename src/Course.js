import React from 'react';

import './App.css';

function Course(props) {
    const course = props.course;
    const authlevel = props.authlevel;

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

    return (
        <div className='Course'>
            <h1 className="coursetitle">{course.coursename}</h1><br></br>
            <p className="coursedescription"><b>Credits:</b> {course.credits}</p>
            <p className="coursedescription"><b>Length:</b> {course.length}</p>
            <p className="coursedescription"><b>Format:</b> {course.format}</p>
            <p className="coursedescription"><b>Course ID:</b> <code>{course.courseid}</code></p>
            <p className="coursedescription"><b>Grade Levels:</b> {course.gradelevels}</p><br></br>
            <p className="coursedescription"><b>Prerequisites:</b> {course.prerequisites}</p><br></br>
            {course.fees != null && <div><p className="coursedescription"><b>Fees:</b> {course.fees}</p></div>}
            {course.corequisite != null && <div><p className="coursedescription"><b>Corequisites:</b> {course.corequisite}</p><br></br></div>}
            {course.subsequent != null && <div><p className="coursedescription"><b>Subsequent:</b> {course.subsequent}</p><br></br></div>}
            {course.studentrecommendations != null && <div><p className="coursedescription"><b>Recommendation:</b> {course.studentrecommendations}</p><br></br></div>}
            <p className="coursedescription"><b>Considerations:</b> {course.considerations}</p><br></br>
            <button className="collapsible" onClick={({target}) => ToggleCollapse(target)}>
                See more
            </button>
            <p className="coursedescription content-collapsible">{course.description}</p><br></br>
            <ion-icon className="edit" name="pencil-outline"></ion-icon>
        </div>
    );
}

export default Course;
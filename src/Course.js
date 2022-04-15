import './App.css';

function Course(props) {
    var course = props.course;
    return (
        <div className='Course'>
            <h1 class="coursetitle">{course.coursename}</h1><br></br>
            <p class="coursedescription"><b>Credits:</b> {course.credits}</p>
            <p class="coursedescription"><b>Length:</b> {course.length}</p>
            <p class="coursedescription"><b>Format:</b> {course.format}</p>
            <p class="coursedescription"><b>Course ID:</b> <code>{course.courseid}</code></p>
            <p class="coursedescription"><b>Grade Levels:</b> {course.gradelevels}</p><br></br>
            <p class="coursedescription"><b>Prerequisites:</b> {course.prerequisites}</p><br></br>
            {course.fees != null && <div><p class="coursedescription"><b>Fees:</b> {course.fees}</p></div>}
            {course.corequisite != null && <div><p class="coursedescription"><b>Corequisites:</b> {course.corequisite}</p><br></br></div>}
            {course.subsequent != null && <div><p class="coursedescription"><b>Subsequent:</b> {course.subsequent}</p><br></br></div>}
            {course.studentrecommendations != null && <div><p class="coursedescription"><b>Recommendation:</b> {course.studentrecommendations}</p><br></br></div>}
            <p class="coursedescription"><b>Considerations:</b> {course.considerations}</p><br></br>
            <button class="collapsible"><b>Description</b><ion-icon name="chevron-down-outline"></ion-icon></button>
            <p class="coursedescription content-collapsible">{course.description}</p><br></br>
            <ion-icon class="edit" name="pencil-outline"></ion-icon>
        </div>
    );
}

export default Course;
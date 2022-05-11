import React, { useRef, useState } from 'react'
import './App.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: 'AIzaSyB7xPx53G2Q39jxMghxSN2P1vaf0YjukwE',
  authDomain: 'courseinspector.firebaseapp.com',
  databaseURL: 'https://courseinspector-default-rtdb.firebaseio.com',
  projectId: 'courseinspector',
  storageBucket: 'courseinspector.appspot.com',
  messagingSenderId: '714692191382',
  appId: '1:714692191382:web:3d52f73c4d534ee5f6ceb7',
  measurementId: 'G-NJ5MX0KYYK'
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

// Set data to realtime database
const dbRef = firebase.database().ref()

function Course (props) {
  const course = props.course
  const authlevel = props.authlevel ? props.authlevel : 0
  const [isEditing, setIsEditing] = useState(false)

  const refs = {
    credits: useRef(null),
    length: useRef(null),
    format: useRef(null),
    courseid: useRef(null),
    gradelevels: useRef(null),
    prerequisites: useRef(null),
    fees: useRef(null),
    corequisite: useRef(null),
    subsequent: useRef(null),
    studentrecommendations: useRef(null),
    considerations: useRef(null),
    description: useRef(null)
  }

  // Add collapse
  function ToggleCollapse (btn) {
    btn.classList.toggle('active')
    const content = btn.nextElementSibling
    if (content.style.maxHeight) {
      btn.innerHTML = 'See more'
      content.style.maxHeight = null
    } else {
      btn.innerHTML = 'See less'
      content.style.maxHeight = content.scrollHeight + 'px'
    }
  }

  function Edit (btn) {
    btn.target.classList.toggle('hide')
    setIsEditing(true)
  }

  function Cancel () {
    setIsEditing(false)
  }

  function Submit () {
    const newCourse = {}

    const loopName = course.coursename.toLowerCase().replaceAll(' ', '-')
    newCourse[loopName] = {}

    Object.keys(course).forEach(key => {
      try {
        if (key === 'description') {
          // console.log(refs[key].current.childNodes[0].textContent);
          newCourse[loopName][key] = refs[key].current.childNodes[0].textContent
        } else {
          // console.log(`${refs[key].current.childNodes[1].wholeText.trim()}`);
          newCourse[loopName][key] = refs[key].current.childNodes[1].wholeText.trim()
        }
      } catch (error) {
        newCourse[loopName][key] = course[key]
      }
    })

    firebase.database().ref('courses').update({
      [loopName]: newCourse[loopName]
    })

    // Note: introduce student comments with this: studentrecommendations: parseInt(studentrecommendations.current.childNodes[1].wholeText.trim()),
    // Exit the edit menu
    setIsEditing(false)
  }

  return (
    <div suppressContentEditableWarning className='Course'>
      <h1 className='coursetitle'>{course.coursename}</h1><br />
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.credits} className='coursedescription'><b contentEditable='false'>Credits:</b> {course.credits}</p>
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.length} className='coursedescription'><b contentEditable='false'>Length:</b> {course.length}</p>
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.format} className='coursedescription'><b contentEditable='false'>Format:</b> {course.format}</p>
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.courseid} className='coursedescription'><b contentEditable='false'>Course ID:</b> {course.courseid}</p>
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.gradelevels} className='coursedescription'><b contentEditable='false'>Grade Levels:</b> {course.gradelevels}</p><br />
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.prerequisites} className='coursedescription'><b contentEditable='false'>Prerequisites:</b> {course.prerequisites}</p><br />
      {course.fees != null && <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.fees} className='coursedescription'><b contentEditable='false'>Fees:</b> {course.fees}</p>}
      {course.corequisite != null && <div><p suppressContentEditableWarning contentEditable={isEditing} ref={refs.corequisite} className='coursedescription'><b contentEditable='false'>Corequisites:</b> {course.corequisite}</p><br /></div>}
      {course.subsequent != null && <div><p suppressContentEditableWarning contentEditable={isEditing} ref={refs.subsequent} className='coursedescription'><b contentEditable='false'>Subsequent:</b> {course.subsequent}</p><br /></div>}
      {course.studentrecommendations != null && <div><p suppressContentEditableWarning contentEditable={isEditing} ref={refs.studentrecommendations} className='coursedescription'><b contentEditable='false'>Recommendation:</b> {course.studentrecommendations}</p><br /></div>}
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.considerations} className='coursedescription'><b contentEditable='false'>Considerations:</b> {course.considerations}</p><br />
      <button className='collapsible' onClick={({ target }) => ToggleCollapse(target)}>See more</button>
      <p suppressContentEditableWarning contentEditable={isEditing} ref={refs.description} className='coursedescription content-collapsible'>{course.description}</p>
      <div className='flex-container'>
        {isEditing && <button onClick={() => Cancel()} className='button'>Cancel</button>}
        {isEditing && <button onClick={() => Submit()} className='button-primary'>Submit</button>}
      </div>
      {(authlevel === 5 && !isEditing) && <ion-icon onClick={(btn) => Edit(btn)} class='edit' name='pencil-outline' />}
    </div>
  )
}

export default Course

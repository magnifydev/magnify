import React from 'react'
import userdefault from './assets/user.png'
import './App.css'

function App (props) {
  const user = props.user
  let authlevel = 0
  if (props.authlevel) {
    authlevel = props.authlevel
  }

  function tagToggle (id) {
    const tag = document.getElementById(id)
    if (tag.classList.contains('tag-true')) {
      tag.classList.remove('tag-true')
      /*
            let firstChild = tag.firstChild;
            firstChild.classList.add("hide");
            */
    } else {
      tag.classList.add('tag-true')
      /*
            let firstChild = tag.firstChild;
            firstChild.classList.remove("hide");
            */
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction () {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  function toggleNav () {
    if (getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim() !== ' 250px') {
      if (getComputedStyle(document.documentElement).getPropertyValue('--pull-width').trim() !== '0px') {
        document.documentElement.style.removeProperty('--pull-width')
      } else {
        document.documentElement.style.setProperty('--pull-width', `${250 - getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim().substring(0, getComputedStyle(document.documentElement).getPropertyValue('--nav-width').trim().length - 2)}px`)
      }
    }
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='school-outline' />
                </span>
                <span className='title'>Course Inspector</span>
              </a>
            </li>
            <li className='hovered'>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='search-outline' />
                </span>
                <span className='title'>Search All</span>
              </a>
            </li>
            <li>
              <a href='https://cdn.linnmar.k12.ia.us/wp-content/uploads/2016/11/2022-2023-LMHS-Program-of-Studies-FINAL2-1.pdf'>
                <span className='icon'>
                  <ion-icon name='document-text-outline' />
                </span>
                <span className='title'>PDF</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='earth-outline' />
                </span>
                <span className='title'>History</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='brush-outline' />
                </span>
                <span className='title'>Art</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='flask' />
                </span>
                <span className='title'>Science</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='musical-notes-outline' />
                </span>
                <span className='title'>Music</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='business-outline' />
                </span>
                <span className='title'>Business</span>
              </a>
            </li>
            <li>
              <a href='#'>
                <span className='icon'>
                  <ion-icon name='construct-outline' />
                </span>
                <span className='title'>Trade</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='main'>
        <div className='topbar'>
          <div className='toggle' onClick={() => toggleNav()}>
            <ion-icon name='menu-outline' />
          </div>
          <div className='search'>
            <label>
              <input id='searchbar' type='text' name='search' placeholder='Search for classes...' />
              <ion-icon name='search-outline' />
            </label>
          </div>

          <button id='signer' className='login'>{user ? 'Sign Out' : 'Login'}</button>

          <div className='user'>
            <img id='user-img' src={user ? user._delegate.photoURL : userdefault} />
          </div>
        </div>
        <div className='tag-container'>
          <button id='MAT' className='tag' onClick={() => tagToggle('MAT')}><ion-icon class='hide' name='checkmark-outline' />Math</button>
          <button id='ENG' className='tag' onClick={() => tagToggle('ENG')}><ion-icon class='hide' name='checkmark-outline' />English</button>
          <button id='SOC' className='tag' onClick={() => tagToggle('SOC')}><ion-icon class='hide' name='checkmark-outline' />History</button>
          <button id='SCI' className='tag' onClick={() => tagToggle('SCI')}><ion-icon class='hide' name='checkmark-outline' />Science</button>
          <button id='BUS' className='tag' onClick={() => tagToggle('BUS')}><ion-icon class='hide' name='checkmark-outline' />Business</button>
          <button id='ART' className='tag' onClick={() => tagToggle('ART')}><ion-icon class='hide' name='checkmark-outline' />Art</button>
          <button id='IND' className='tag' onClick={() => tagToggle('IND')}><ion-icon class='hide' name='checkmark-outline' />Trade</button>
          <button id='MUS' className='tag' onClick={() => tagToggle('MUS')}><ion-icon class='hide' name='checkmark-outline' />Music</button>
        </div>
        <div id='course-container'>{props.classitems}</div>
      </div>
      <div onClick={() => topFunction()} id='to-top' className='jump-to-top'>
        <ion-icon name='chevron-up-outline' size='larger' />
      </div>
    </div>
  )
}

export default App

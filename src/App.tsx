import './App.css';
import {
  ClearFilter,
  ContactForm,
  Course,
  FloatingActionable,
  Loader,
  MobileNavigation,
  Navigation,
  TagBar,
  TopBar,
} from './components';
import { auth, db, provider } from './config';
import localCourseData from './data/coursedata.json';
import { CourseDataType, CourseType } from './types';
import { getCookieValue, getWidth } from './utils';
import firebase from 'firebase/compat/app';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

const COURSE_ID_REGEX = /[A-Z]{3}[0-9]{3}/g;
const COURSE_ID_REGEX_SINGLE = /[A-Z]{3}[0-9]{3}/;

const TAG_CODES: Record<string, string> = {
  ADP: 'Advanced Placement',
  CSC: 'Computer Science',
  MAT: 'Math',
  BUS: 'Business',
  SOC: 'Social Studies',
  ENG: 'English',
  IND: 'Engineering',
  FAM: 'Family Consumer Sciences',
  AGR: 'Agriculture',
  SCI: 'Science',
  HPE: 'Health/PE',
  ART: 'Art',
  FOR: 'Foreign Language',
  MUS: 'Music',
  TAG: 'Talented and Gifted',
  VEN: 'Venture',
};

const getNumColumns = (width: number): number => {
  if (width > 1400) return 4;
  if (width > 1100) return 3;
  if (width > 800) return 2;
  return 1;
};

const App: FC = (): JSX.Element => {
  const [courseData, setCourseData] = useState<CourseDataType | null>(null);
  const [user, setUser] = useState<firebase.User | null>(() => {
    const cookie = getCookieValue('user');
    if (!cookie) return null;
    try {
      return JSON.parse(cookie);
    } catch {
      return null;
    }
  });
  const [authLevel, setAuthLevel] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(getWidth());

  // Fetch course data from Firebase, fall back to local data
  useEffect(() => {
    db.ref()
      .get()
      .then((snapshot) => {
        setCourseData(
          snapshot.exists() ? snapshot.val().courses : localCourseData
        );
      })
      .catch(() => setCourseData(localCourseData));
  }, []);

  // Fetch auth level for the signed-in user
  useEffect(() => {
    if (!user) return;
    db.ref()
      .get()
      .then((snapshot) => {
        if (!snapshot.exists()) return;
        const users: { [key: string]: { email: string; level: number } } =
          snapshot.val().users;
        Object.values(users).forEach(({ email, level }) => {
          if (user.email === email) setAuthLevel(level);
        });
      });
  }, [user]);

  // Window resize listener for responsive column layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(getWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll listener: show/hide desktop back-to-top button and mobile nav
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const topButton = document.getElementById('to-top');
      if (topButton) {
        const visible = window.scrollY >= 80 && windowWidth >= 525;
        topButton.style.visibility = visible ? 'visible' : 'hidden';
        topButton.style.opacity = visible ? '1' : '0';
      }
      if (windowWidth < 525) {
        const nav = document.getElementById('mobile-nav');
        if (nav) {
          nav.style.bottom =
            window.scrollY < prevScrollPos ? '0' : `-${nav.offsetHeight}px`;
        }
      }
      prevScrollPos = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowWidth]);

  // Re-trigger hash jump after initial course data loads
  // (React rendering can interfere with native hash navigation)
  useEffect(() => {
    const jumpId = window.location.hash;
    window.location.hash = '';
    window.location.hash = jumpId;
  }, []);

  const courseIDtoNameMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const courseName in courseData) {
      courseData![courseName].courseid.match(COURSE_ID_REGEX)?.forEach((id) => {
        map.set(id, courseName);
      });
    }
    return map;
  }, [courseData]);

  const courseIDtoCourse = useCallback(
    (courseID: string): CourseType => {
      const id = courseID.match(COURSE_ID_REGEX_SINGLE)?.[0] ?? '';
      return (
        courseData?.[courseIDtoNameMap.get(id) ?? ''] ??
        ('' as unknown as CourseType)
      );
    },
    [courseData, courseIDtoNameMap]
  );

  const handleCourseUpdate = useCallback(
    (key: string, updated: CourseType) => {
      setCourseData((prev) => (prev ? { ...prev, [key]: updated } : prev));
    },
    []
  );

  const filteredCourseItems = useMemo(() => {
    if (!courseData) return [];
    const key = encodeURIComponent(
      searchQuery.toLowerCase().replaceAll(' ', '-')
    ).replace(/\./g, '%2E');
    return Object.keys(courseData)
      .filter((name) => {
        const matchesSearch = name.search(key) !== -1;
        const matchesTags =
          activeTags.length === 0 ||
          activeTags.some((tag) =>
            courseData[name].tags?.includes(TAG_CODES[tag])
          );
        return matchesSearch && matchesTags;
      })
      .map((name) => (
        <Course
          key={name}
          authLevel={authLevel}
          course={courseData[name]}
          jumpId={courseData[name].courseid}
          courseIDtoCourse={courseIDtoCourse}
          onCourseUpdate={handleCourseUpdate}
        />
      ));
  }, [courseData, searchQuery, activeTags, authLevel, courseIDtoCourse, handleCourseUpdate]);

  const handleTagToggle = useCallback((id: string) => {
    setActiveTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveTags([]);
  }, []);

  const handleSignIn = useCallback(() => {
    if (user) {
      auth.signOut().then(() => {
        setUser(null);
        setAuthLevel(0);
        document.cookie =
          'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      });
    } else {
      auth.signInWithPopup(provider).then((result) => {
        const signedInUser = result.user;
        if (!signedInUser) return;
        setUser(signedInUser);
        document.cookie = `user=${JSON.stringify(signedInUser)}`;
      });
    }
  }, [user]);

  const handleContactModalOpen = useCallback(() => {
    const contactModal = document.getElementById(
      'contact-modal'
    ) as HTMLDialogElement;
    contactModal?.parentElement?.classList.remove('hide');
    contactModal?.showModal();
  }, []);

  const numColumns = getNumColumns(windowWidth);

  const classItems = useMemo(() => {
    const items =
      filteredCourseItems.length > 0
        ? filteredCourseItems
        : [<ClearFilter key="clear" onClearFilters={handleClearFilters} />];
    const flexParents = Array.from({ length: numColumns }, (_, i) => (
      <div key={i} className="flex-parent">
        {items.filter((_, j) => j % numColumns === i)}
      </div>
    ));
    return <div className="parent">{flexParents}</div>;
  }, [filteredCourseItems, numColumns, handleClearFilters]);

  const userElement: JSX.Element = user?.photoURL ? (
    <div className="user">
      <img id="user-img" src={user.photoURL} alt="User profile" />
    </div>
  ) : (
    <div className="hide" />
  );

  if (!courseData) {
    return <Loader />;
  }

  return (
    <div className="App">
      <ContactForm />
      <div className="container">
        <Navigation authLevel={authLevel} />
      </div>
      <div className="main">
        <TopBar
          user={user}
          userElement={userElement}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onSignIn={handleSignIn}
        />
        <TagBar
          activeTags={activeTags}
          onTagToggle={handleTagToggle}
          onClearTags={handleClearFilters}
        />
        <div
          id="course-container"
          style={
            filteredCourseItems.length === 0
              ? { display: 'flex', justifyContent: 'center' }
              : undefined
          }
        >
          {classItems}
        </div>
      </div>
      <FloatingActionable handleContactModalOpen={handleContactModalOpen} />
      <MobileNavigation handleContactModalOpen={handleContactModalOpen} />
    </div>
  );
};

export default App;

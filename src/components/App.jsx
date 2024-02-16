import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Register from './Register';
import Login from './Login';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from './Profile';
import Footer from "./Footer";
import NotFound from './NotFound';

function App() {

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // const handleLogin = () => {
  //   setLoggedIn(!loggedIn);
  // }

  return (
    <div className="center-pos">
      {(currentPath === '/' || currentPath === '/profile' || currentPath === '/movies' || currentPath === '/saved-movies') && <Header login={loggedIn} />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="signup" element={<Register />} />
        <Route path="signin" element={<Login />} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {(currentPath === '/' || currentPath === '/movies' || currentPath === '/saved-movies') && <Footer />}
    </div>
  );
}

export default App
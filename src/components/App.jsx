import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import mainApi from '../utils/MainApi';
import ProtectedRouteElement from './ProtectedRouteElement';
import CurrentUserContext from '../contexts/CurrentUserContext';
import LoggedInStatusContext from '../contexts/LoggedInStatusContext';
import { onLogout } from '../utils/Auth';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const loggedInStorage = localStorage.getItem('loggedIn');

  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [currentUser, setCurrentUser] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(loggedInStorage);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {

      if (currentPath.endsWith('/signup') || currentPath.endsWith('/signin')) {
        navigate(navigate(-1), { replace: true });
        return;
      }
    }
  }, [navigate, currentPath]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      mainApi.getProfileInfo()
        .then((userData) => {
          setCurrentUser(userData);
          handleLogin(true);
        })
        .catch(err => {
          console.error('Ошибка при запросе к API:', err);
        });
    }
  }, []);

  const handleLogin = (status) => {
    localStorage.setItem('loggedIn', loggedIn);
    setLoggedIn(status);
  }

  const editProfile = (status) => {
    setIsEditing(status);
  }

  const onSignOut = () => {
    onLogout().then((res) => {
      if (res) {
        localStorage.removeItem('userId');
        localStorage.removeItem('searchQuery');
        localStorage.removeItem('shortFilm');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('movies');
        handleLogin(false);
        navigate('/', { replace: true });
      }
    })
      .catch(err => {
        console.error('Ошибка на стороне сервера:', err);
      });
  }

  const handleUpdateUser = (userData) => {
    return mainApi.setProfileInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setIsEditing(false);
        alert('Данные успешно обновлены');
        setError('');
      })
      .catch((err) => {
        setError(err.status === 409 ? err.error.message : 'При обновлении профиля произошла ошибка.');
        setIsEditing(true);
        console.error(err.error.message);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInStatusContext.Provider value={loggedIn}>
        <div className="center-pos">
          {(currentPath === '/' || currentPath === '/profile' || currentPath === '/movies' || currentPath === '/saved-movies') && <Header />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="signup" element={<Register handleLogin={handleLogin} />} />
            <Route path="signin" element={<Login handleLogin={handleLogin} />} />
            <Route path="movies" element={<ProtectedRouteElement element={Movies} />} />
            <Route path="saved-movies" element={<ProtectedRouteElement element={SavedMovies} />} />
            <Route path="profile" element={<ProtectedRouteElement
              element={Profile}
              handleLogin={handleLogin}
              onSignOut={onSignOut}
              onUpdateUser={handleUpdateUser}
              isEditing={isEditing}
              editProfile={editProfile}
              error={error}
            />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {(currentPath === '/' || currentPath === '/movies' || currentPath === '/saved-movies') && <Footer />}
        </div>
      </LoggedInStatusContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
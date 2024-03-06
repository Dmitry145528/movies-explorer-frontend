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
import {
  HTTP_STATUS_CONFLICT,
  ENDPOINT_SIGNUP,
  ENDPOINT_SIGNIN,
  ENDPOINT_MOVIES,
  ENDPOINT_SAVED_MOVIES,
  ENDPOINT_PROFILE,
  ENDPOINT_MAIN
} from '../utils/constans';

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const loggedInStorage = localStorage.getItem('loggedIn');

  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [currentUser, setCurrentUser] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(loggedInStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {

      if (currentPath.endsWith(ENDPOINT_SIGNUP) || currentPath.endsWith(ENDPOINT_SIGNIN)) {
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
    localStorage.setItem('loggedIn', status);
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
        navigate(ENDPOINT_MAIN, { replace: true });
      }
    })
      .catch(err => {
        console.error('Ошибка на стороне сервера:', err);
      });
  }

  const handleUpdateUser = (userData) => {
    if (!isSubmitting) {
      setIsSubmitting(true); // блокируем форму при начале отправки запроса
      return mainApi.setProfileInfo(userData)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          setIsEditing(false);
          alert('Данные успешно обновлены');
          setError('');
        })
        .catch((err) => {
          setError(err.status === HTTP_STATUS_CONFLICT ? err.error.message : 'При обновлении профиля произошла ошибка.');
          setIsEditing(true);
          console.error(err.error.message);
        })
        .finally(() => {
          setIsSubmitting(false); // разблокируем форму после завершения запроса
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LoggedInStatusContext.Provider value={loggedIn}>
        <div className="center-pos">
          {(currentPath === ENDPOINT_MAIN || currentPath === ENDPOINT_PROFILE || currentPath === ENDPOINT_MOVIES || currentPath === ENDPOINT_SAVED_MOVIES) && <Header />}
          <Routes>
            <Route path={ENDPOINT_MAIN} element={<Main />} />
            <Route path={ENDPOINT_SIGNUP} element={<Register handleLogin={handleLogin} />} />
            <Route path={ENDPOINT_SIGNIN} element={<Login handleLogin={handleLogin} />} />
            <Route path={ENDPOINT_MOVIES} element={<ProtectedRouteElement element={Movies} />} />
            <Route path={ENDPOINT_SAVED_MOVIES} element={<ProtectedRouteElement element={SavedMovies} />} />
            <Route path={ENDPOINT_PROFILE} element={<ProtectedRouteElement
              element={Profile}
              handleLogin={handleLogin}
              onSignOut={onSignOut}
              onUpdateUser={handleUpdateUser}
              isEditing={isEditing}
              editProfile={editProfile}
              error={error}
              isSubmitting={isSubmitting}
            />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {(currentPath === ENDPOINT_MAIN || currentPath === ENDPOINT_MOVIES || currentPath === ENDPOINT_SAVED_MOVIES) && <Footer />}
        </div>
      </LoggedInStatusContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
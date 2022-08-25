import React, { ReactNode, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { deleteState } from '../utils/reduxSyncStorage';
import { ILogged } from '../mocks/auth';
import { logout, selectCurrentUser } from '../store/slices/userSlice';

export const UserContext = createContext<{
  onLogout: () => void;
}>({
  onLogout: () => {
    return;
  }
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const user: ILogged = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as { pathname: string };

  const onLogout = () => {
    deleteState();
    dispatch(logout());
    setTimeout(() => {
      navigate('/');
    }, 100);
  };

  const onNavigate = () => {
    if (!user.token) {
      deleteState();
      navigate('/');
    }
  };

  useEffect(() => {
    onNavigate();
  }, []);

  useEffect(() => {
    if (!user.token) {
      deleteState();
      navigate('/');
    } else if (location.pathname === '/') navigate('app/posts');
  }, [user.token]);

  useEffect(() => {
    onNavigate();
  }, [window.location.hash]);

  return (
    <UserContext.Provider
      value={{
        onLogout: onLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

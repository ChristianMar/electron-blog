import { ILogged } from '../mocks/auth';

const STORAGE_NAME = process.env.PROJECT + '_' + process.env.BUILD_TIMESTAMP;

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_NAME);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state: { user: { user: ILogged } }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_NAME, serializedState);
  } catch (error) {
    return;
  }
};

export const deleteState = () => {
  try {
    localStorage.removeItem(STORAGE_NAME);
  } catch (error) {
    return;
  }
};

import { useContext } from 'react';
import { CurrentUserContext, SetCurrentUserContext } from '../contexts/CurrentUserContext';

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
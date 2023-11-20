import { createContext, useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { firebaseApp } from '../../libs/firebase';
import { Issuer } from '../../utils/auth';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const auth = getAuth(firebaseApp);
var ActionType;
(function (ActionType) {
  ActionType['AUTH_STATE_CHANGED'] = 'AUTH_STATE_CHANGED';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null
};

const reducer = (state, action) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

export const AuthContext = createContext({
  ...initialState,
  issuer: Issuer.Firebase,
  signInWithGoogle: () => Promise.resolve(),
  signOut: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);

  const handleAuthStateChanged = useCallback((user) => {
    if (user) {
      // Check if the email ends with "@hcmut.edu.vn"
      if (user.email.endsWith("@hcmut.edu.vn")) {
        dispatch({
          type: ActionType.AUTH_STATE_CHANGED,
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid || '0',
              avatar: user.photoURL || undefined,
              email: user.email,
              name: user.displayName || 'John Doe'
            }
          }
        });
      } else {
        // If the email doesn't end with "@hcmut.edu.vn", sign out the user
        if (state.isAuthenticated) {
          signOut(auth);
        }
        dispatch({
          type: ActionType.AUTH_STATE_CHANGED,
          payload: {
            isAuthenticated: false,
            user: null,
            error: 'Invalid email domain. Only "@hcmut.edu.vn" is allowed.'
          }
        });
        setOpen(true);
      }
    } else {
      dispatch({
        type: ActionType.AUTH_STATE_CHANGED,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [dispatch, state.isAuthenticated]);

  useEffect(() => onAuthStateChanged(auth, handleAuthStateChanged),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  }, []);

  const _signOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        issuer: Issuer.Firebase,
        signInWithGoogle,
        signOut: _signOut
      }}
    >
     <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <Alert severity="error" onClose={() => setOpen(false)}>
        Mail sai rồi bạn ơi. Web chỉ cho phép mail đuôi "@hcmut.edu.vn" thôi nhé.
      </Alert>
    </Dialog>
          {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
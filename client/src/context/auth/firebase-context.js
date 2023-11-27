import { createContext, useCallback, useEffect, useReducer, useState } from 'react';
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

const auth = getAuth(firebaseApp);
var ActionType;
(function (ActionType) {
  ActionType['AUTH_STATE_CHANGED'] = 'AUTH_STATE_CHANGED';
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  error: null,
  isLoading: true // Added isLoading to initialState
};

const reducer = (state, action) => {
  if (action.type === 'AUTH_STATE_CHANGED') {
    const { isAuthenticated, user, isLoading } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      isLoading // Added isLoading to the state
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
  const [loading, setLoading] = useState(false);

  const handleAuthStateChanged = useCallback(async (user) => {
    if (user) {
      await user.reload();

      // Check if the email ends with "@hcmut.edu.vn"
      if (user.email.endsWith("@hcmut.edu.vn")) {
        // Send user data to backend
        const response = await fetch('http://localhost:6969/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.displayName,
            mail: user.email,
            avatar: user.photoURL ,
            token: user.uid ,
          }),
        });

        const data = await response.json();
        // Handle response data...
        console.log(data);
        let userId;
        if (data && data.User) {
          userId = data.User._id;
        }

        dispatch({
          type: ActionType.AUTH_STATE_CHANGED,
          payload: {
            isAuthenticated: true,
            user: {
              _id: userId || '69',
              id: user.uid || '0',
              avatar: user.photoURL || undefined,
              email: user.email,
              name: user.displayName || 'John Doe'
            },
            isLoading: false // Added isLoading to the payload
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
            error: 'Invalid email domain. Only "@hcmut.edu.vn" is allowed.',
            isLoading: false // Added isLoading to the payload
          }
        });
        setOpen(true);
      }
    } else {
      dispatch({
        type: ActionType.AUTH_STATE_CHANGED,
        payload: {
          isAuthenticated: false,
          user: null,
          isLoading: false // Added isLoading to the payload
        }
      });
    }
  }, [dispatch, state.isAuthenticated]);

  useEffect(() => onAuthStateChanged(auth, handleAuthStateChanged),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
        signOut: _signOut,
        loading
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
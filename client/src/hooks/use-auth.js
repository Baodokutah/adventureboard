import { useContext } from 'react';
import { AuthContext } from '../context/auth/firebase-context';

export const useAuth = () => useContext(AuthContext);

export function withAuth(Component) {
  return function WrappedComponent(props) {
    const { signInWithGoogle } = useContext(AuthContext);
    
    return <Component {...props} signInWithGoogle={signInWithGoogle} />;
  }
}
import { useAuth } from "./use-auth";
export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  if (!user) {
    return null; // or return null, or a loading spinner, etc.
  }
  return {
    _id: user._id,
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    email: user.email
  };

};

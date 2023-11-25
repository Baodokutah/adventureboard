import { useAuth } from "./use-auth";
export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return {
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    email: user.email
  };

};

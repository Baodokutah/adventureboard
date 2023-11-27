import { useState, useEffect } from 'react';

export default function useIsMember(user, memberList) {
  const [isMember, setIsMember] = useState(false);
  const [buttonClickedJoin, setButtonClickedJoin] = useState(false);

  useEffect(() => {
    if (user && memberList.includes(user.name)) {
      setIsMember(true);
      setButtonClickedJoin(true);
    } else {
      setIsMember(false);
      setButtonClickedJoin(false);
    }
  }, [user, memberList]);

  return { isMember, buttonClickedJoin };
}
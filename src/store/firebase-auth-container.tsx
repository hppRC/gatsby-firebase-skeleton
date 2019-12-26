import 'firebase/auth';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

type User = {
  readonly uid: string;
  readonly name: string;
};

const useFirebaseAuthContainer = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userName = user.displayName ? user.displayName : 'no name';
        setUser({ uid: user.uid, name: userName });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user };
};

export const FirebaseAuthContainer = createContainer(useFirebaseAuthContainer);

export default FirebaseAuthContainer;

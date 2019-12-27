import 'firebase/auth';

import firebase from 'firebase/app';
import React from 'react';

import styled from '@emotion/styled';

type Props = {
  providerName: string;
};

const AuthButton: React.FCX<Props> = ({ className, providerName }) => {
  // let provider: firebase.auth.AuthProvider;
  // console.log(providerName);
  // switch (providerName) {
  //   case 'google':
  //     console.log('yeah');
  //     provider = new firebase.auth.GoogleAuthProvider();
  //     console.log(provider);
  //     console.log(new firebase.auth.GoogleAuthProvider());
  //   case 'twitter':
  //     provider = new firebase.auth.TwitterAuthProvider();
  //   case 'email':
  //     provider = new firebase.auth.EmailAuthProvider();
  //   case 'github':
  //     provider = new firebase.auth.GithubAuthProvider();
  // }
  const provider = new firebase.auth.GoogleAuthProvider();
  console.log(provider);
  const onClick = () => {
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <button className={className} onClick={onClick}>
      Sign in with Google
    </button>
  );
};

export const StyledAuthButton = styled(AuthButton)``;

export default StyledAuthButton;

import 'firebase/auth';

import firebase from 'firebase/app';
import * as React from 'react';

import styled from '@emotion/styled';

const SignOutButton = () => {
  const onClick = () => {
    firebase.auth().signOut();
  };

  return (
    <button onClick={onClick}>Sign out from gatsby-firebase-skeleton</button>
  );
};

export const StyledSignOutButton = styled(SignOutButton)``;

export default StyledSignOutButton;

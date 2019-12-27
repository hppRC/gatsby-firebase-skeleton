import React from 'react';
import { SEO, StyledAuthButton as AuthButton } from 'src/components';
import baseStyle from 'src/styles/base-style';

import styled from '@emotion/styled';

const Index: React.FCX = ({ className }) => {
  return (
    <main className={className}>
      <h1>this is index page!</h1>
      <AuthButton providerName={'google'} />
    </main>
  );
};

const StyledIndex = styled(Index)`
  ${baseStyle};
  padding-top: 20vh;
`;

export default () => (
  <>
    <SEO title='Top' pathname='/' />
    <StyledIndex />
  </>
);

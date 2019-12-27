import React from 'react';
import { useFirestoreTodos } from 'src/hooks';
import { User } from 'types/models';

import styled from '@emotion/styled';

type Props = {
  user: User;
};

export const TodoContents: React.FCX<Props> = ({ user }) => {
  const { todos, loading } = useFirestoreTodos(user.uid);

  return (
    <section>
      {loading ? <h1>now loading</h1> : <h1>successfully logged in</h1>}
      {console.log(todos)}
    </section>
  );
};

export const StyledTodoContents = styled(TodoContents)``;

export default TodoContents;

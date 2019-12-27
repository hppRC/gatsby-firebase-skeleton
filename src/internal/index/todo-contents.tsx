import React, { useRef } from 'react';
import { useFirestoreTodos } from 'src/hooks';
import { FirebaseAuthContainer } from 'src/store';

import styled from '@emotion/styled';

export const TodoContents: React.FCX = () => {
  const { user } = FirebaseAuthContainer.useContainer();
  if (!user) return <></>;

  const { todos, loading, addTodo } = useFirestoreTodos(user.uid);
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!ref.current) return;

    addTodo(user.uid, ref.current.value);
    ref.current.value = '';
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input type='text' ref={ref} />
        <button type='submit'>Add Todo</button>
      </form>
      {loading ? (
        <h1>now loading</h1>
      ) : (
        todos?.map(todo => {
          console.log(todo);
        })
      )}
    </section>
  );
};

export const StyledTodoContents = styled(TodoContents)``;

export default TodoContents;

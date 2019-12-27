import React, { useRef } from 'react';
import { useFirestoreTodos } from 'src/hooks';
import { FirebaseAuthContainer } from 'src/store';

import styled from '@emotion/styled';

export const TodoContents: React.FCX = ({ className }) => {
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
    <section className={className}>
      <form onSubmit={onSubmit}>
        <input type='text' ref={ref} />
        <button type='submit'>Add Todo</button>
      </form>
      {loading ? (
        <h1>now loading</h1>
      ) : (
        todos?.map(({ id, text, completed }, i) => (
          <ul key={i}>
            <li>{id}</li>
            <li>{text}</li>
            <li>{completed ? 'completed' : 'not completed'}</li>
          </ul>
        ))
      )}
    </section>
  );
};

export const StyledTodoContents = styled(TodoContents)`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    list-style: none;
  }
`;

export default TodoContents;

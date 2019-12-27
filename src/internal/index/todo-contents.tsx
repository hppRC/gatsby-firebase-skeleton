import React from 'react';
import { useFirestoreTodos } from 'src/hooks';
import { FirebaseAuthContainer } from 'src/store';

import styled from '@emotion/styled';

const AddTodoForm = () => {
  const { user } = FirebaseAuthContainer.useContainer();
  if (!user) return <></>;
  const { addTodo } = useFirestoreTodos(user.uid);
  const textInput = React.useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    if (!textInput.current) {
      return;
    }
    addTodo(user.uid, textInput.current.value);
    textInput.current.value = '';
  };
  return (
    <form onSubmit={onSubmit}>
      <input type='text' ref={textInput} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export const TodoContents: React.FCX = () => {
  const { user } = FirebaseAuthContainer.useContainer();
  if (!user) return <h1>test</h1>;

  const { todos, loading } = useFirestoreTodos(user.uid);

  return (
    <section>
      <h1>tests</h1>
      <AddTodoForm />
      {loading ? <h1>now loading</h1> : <h1>todos</h1>}
      {console.log(todos)}
    </section>
  );
};

export const StyledTodoContents = styled(TodoContents)``;

export default TodoContents;

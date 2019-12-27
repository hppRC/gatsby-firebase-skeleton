import 'firebase/firestore';

import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { Todo } from 'types/models';

export const todosCollection = (uid: string) =>
  firebase
    .firestore()
    .collection(`users`)
    .doc(uid)
    .collection(`todos`);

export const useFirestoreTodos = (uid: string) => {
  const [todos, setTodos] = useState<Todo[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    const collection = todosCollection(uid);

    let query: firebase.firestore.Query = collection.orderBy(
      `createdAt`,
      `desc`
    );

    (async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const todosData = snap.docs.map(doc => ({
          ...(doc.data() as Todo),
          id: doc.id
        }));
        setTodos(todosData);
        setError(null);
      } catch (err) {
        setError(err);
        console.error(err);
      }
      setLoading(false);
    })();
  }, []);

  const addTodo = async (uid: string, todoName: string) => {
    if (!todoName.trim()) return;

    await todosCollection(uid)
      .add({
        text: todoName,
        completed: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        console.error('Error add todo to Firebase Database', error);
      });
    return;
  };

  const updateTodo = async (
    uid: string,
    todoId: string,
    completed: boolean
  ) => {
    await todosCollection(uid)
      .doc(todoId)
      .update({
        completed,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(error => {
        console.error('Error update todo to Firebase Database', error);
      });
    return;
  };

  const deleteTodo = async (uid: string, todoId: string) => {
    await todosCollection(uid)
      .doc(todoId)
      .delete()
      .catch(error => {
        console.error('Error delete todo to Firebase Database', error);
      });
    return;
  };

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
};

export default useFirestoreTodos;

import { firestore } from 'firebase';

export type Todo = {
  readonly id?: string;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt?: firestore.Timestamp;
  readonly updatedAt?: firestore.Timestamp;
};

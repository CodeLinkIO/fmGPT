import useFirebaseStore from '@store/firebase-store';
import useStore, { createPartializedState } from '@store/store';

import { debounce } from 'lodash';
import { StorageValue } from 'zustand/middleware';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEBOUNCE_DELAY_IN_MILLISECONDS = 4000;

export const createUserChats = async (
  uid: string,
  data: ReturnType<typeof createPartializedState>
) => {
  const body = JSON.stringify({ uid, data });
  const response = await fetch(`${BASE_URL}/users`, {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Cannot create user');
  }

  return true;
};

export const fetchUserChats = async <S>(uid: string) => {
  const response = await fetch(`${BASE_URL}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Cannot fetch user chats by user uid ${uid}`);
  }

  const result: { data: string } = await response.json();
  const data: StorageValue<S> = JSON.parse(JSON.stringify(result.data));
  return data;
};

export const deleteUserChats = async (uid: string) => {
  const response = await fetch(`${BASE_URL}/users/${uid}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Cannot delete user chats by user uid ${uid}`);
  }
};

export const updateUserChats = async <S>(
  uid: string,
  data: StorageValue<S>
) => {
  const body = JSON.stringify({ data });
  const response = await fetch(`${BASE_URL}/users/${uid}`, {
    body,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Cannot update user chats by user uid ${uid}`);
  }
};

export const updateUserChatsDebounce = debounce(
  async <S>(uid: string, data: StorageValue<S>) => {
    try {
      await updateUserChats(uid, data);
      useFirebaseStore.getState().setSyncStatus('synced');
    } catch (error) {
      useStore.getState().setToastMessage((error as Error).message);
      useStore.getState().setToastShow(true);
      useStore.getState().setToastStatus('error');
      useFirebaseStore.getState().setSyncStatus('unauthenticated');
    }
  },
  DEBOUNCE_DELAY_IN_MILLISECONDS
);

export const isUserExisting = async (uid: string) => {
  try {
    await fetchUserChats(uid);
    return true;
  } catch (error) {
    return false;
  }
};

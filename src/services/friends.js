// src/services/friends.js
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore';

export const sendFriendRequest = async (fromUserId, toUserId) => {
  await addDoc(collection(db, 'friendRequests'), {
    from: fromUserId,
    to: toUserId,
    status: 'pending',
    createdAt: new Date()
  });
};

export const getFriendRequests = async (userId) => {
  const q = query(
    collection(db, 'friendRequests'),
    where('to', '==', userId),
    where('status', '==', 'pending')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
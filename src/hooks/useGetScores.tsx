import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import React from 'react'
import { firestore } from '../lib/firebase';
import type { ScoresBoardDataType } from '../types/types';

export default function useGetScores(scoreBoard: "top-scores-easy" | "top-scores-hard") {

return useQuery({
    queryKey: ["scores", scoreBoard],
    queryFn: async () => {
      const snapshot = await getDocs(collection(firestore, scoreBoard));
      const topTen: ScoresBoardDataType[] = [];
      snapshot.forEach((doc) => topTen.push(doc.data() as ScoresBoardDataType));
      return topTen;
    },
  });
}

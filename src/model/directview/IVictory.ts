interface IVictory {
  checkinCount: number;
  checkinMember: {
    id: string;
    memberSeq: number;
    name: string;
    nickname: string;
  };
  eraPercentage: string;
  rank: number;
  winCount: number;
  winStreakCount: number;
  winWeightPercentage: string;
}

export {IVictory};

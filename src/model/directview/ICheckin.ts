interface ICheckIn {
    blockYN: string;
    checkinDateAt: string;
    checkinMember: {
        id: string;
        memberSeq: number;
        name: string;
        nickname: string;
    };
    checkinSeq: number;
    checkinTimeAt: string;
    createdAt: string;
    gameOppositeTeamName: string;
    gameScoreText: string;
    gameStatusType: string;
}

interface ICheckInDetail {
    blockReason: string;
    blockYN: string;
    checkinDateAt: string;
    checkinMember: {
        id: string;
        memberSeq: number;
        name: string;
        nickname: string;
    };
    checkinTimeAt: string;
    createdAt: string;
    gameOppositeTeamName: string;
    gameScoreText: string;
    gameStatusType: string;
    image: string;
}


export {ICheckIn, ICheckInDetail};

interface ILive {
  eventSeq: number;
  eventStatusType: string;
  eventBenefitType: string;
  itemDetailType: string;
  eventDrawType: string;
  applyCount: number;
  title: string;
  image: string;
  game: {gameId: string; gameAt: string};
  period: { startTimeAt: string; endTimeAt: string; };
  // bannerYN: string | boolean; //배너 개시여
  bannerPublishYN: string; //배너 게시 여부
  bannerRegisterYN: string; //배너 등록 여부
  createdAt: string;
}

interface IAddLiveEvent {
  candidateCount: number;
  caution: string;
  content: string;
  contentImages: string[];
  eventBenefitType: string;
  eventDrawType: string;
  game: {gameId: string};
  image: string;
  itemDetailType: string;
  itemSeq: number;
  period: {
    startTimeAt: string;
    endTimeAt: string;
  },
  point: number;
  subtitle: string;
  title: string;
  winnerCount: number;
}

interface ILiveDetail {
  eventSeq: number;
  eventStatusType: string;
  eventBenefitType: string;
  itemDetailType: string;
  eventDrawType: string;
  item: {
    itemSeq: number;
    itemType: string;
    itemDetailType: string;
    itemStatusType: string;
    count: number;
    countUnlimit: boolean;
    name: string;
    point: number;
    price: number;
    image: string;
    createdAt: string;
  };
  point: number;
  candidateCount: number;
  winnerCount: number;
  applyCount: number;
  title: string;
  subtitle: string;
  image: string;
  drawAt: string;
  game: {
    gameId: string;
    gameAt: string;
  };
  period: {
    startTimeAt: string;
    endTimeAt: string;
  };
  caution: string;
  content: string;
  contentImages: string[];
  // bannerYN: string;
  bannerPublishYN: string; //배너 게시 여부
  bannerRegisterYN: string; //배너 등록 여부
  createdAt: string;
}

interface IModifyLive {
  caution: string;
  content: string;
  contentImages: string[];
  game: {gameId: string};
  image: string;
  itemSeq: number;
  period: {
    startTimeAt: string;
    endTimeAt: string;
  },
  point: number;
  subtitle: string;
  title: string;
}


interface IGame {
  gameId: string;
  gameAt: string;
}

export {
  ILive,
  IAddLiveEvent,
  ILiveDetail,
  IModifyLive,
  IGame
};

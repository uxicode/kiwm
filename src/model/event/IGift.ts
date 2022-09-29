 interface IGift{
  count: number;
  countUnlimit: boolean;
  createdAt: string;
  itemDetailType: string;
  itemSeq: number;
  itemStatusType: string;
  itemType: string;
  name: string;
  point: number;
  price: number;
  image: string;
}

interface IGiftForm{
  count: number;
  countUnlimit: boolean;
  itemDetailType: string;
  itemStatusType: string;
  itemType: string;
  name: string;
  point: number;
  price: number;
  image: string;
}

interface IGiftDetailForm {
  count: number;
  countUnlimit: boolean;
  image: string;
  itemStatusType: string;
  name: string;
  point: number;
  price: number;
}

export { IGift, IGiftForm, IGiftDetailForm };

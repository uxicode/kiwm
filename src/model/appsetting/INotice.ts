//공지목록 및 조회(상세)
interface INotice {
  alwaysYn: string;
  content: string;
  createdAt: string | Date;
  endAt: string;
  postSeq: number;
  postYn: string;
  startAt: string;
  title: string;
}

//공지등록
interface INoticeForm {
  alwaysYn: string;
  content: string;
  endAt: string;
  postSeq: number;
  postYn: string;
  startAt: string;
  title: string;
}

/* 공지수정 */
interface INoticeDetailForm {
  alwaysYn: string;
  content: string;
  endAt: string;
  postSeq: number;
  postYn: string;
  startAt: string;
  title: string;
}

export {INotice, INoticeForm, INoticeDetailForm};

//자주묻는질문 목록 및 조회(상세)
interface IFaq {
  createdAt: string | Date;
  faqType: string;
  postSeq: number;
  publishYN: string;
  title: string;
}

//자주묻는질문 상세
interface IFaqDetailForm{
  content: string;
  createdAt: string | Date;
  faqType: string;
  postSeq: number;
  publishYN: string;
  title: string;
}

//자주묻는질문 등록
interface IFaqForm {
  content: string;
  faqType: string;
  publishYN: string;
  title: string;
}

/* 자주묻는질문 수정 */
interface IFaqModifyForm {
  content: string;
  faqType: string;
  publishYN: string;
  title: string;
}

/* 순서 정렬 */
interface IFaqsSortList {
  faqType: string;
  faqs: number;
}

export {IFaq, IFaqForm, IFaqDetailForm, IFaqModifyForm, IFaqsSortList};

interface IContact{
  contactSeq: number;
  contactType: string;
  contactStatusType: string;
  title: string;
  contactMember: {
    id: string;
    memberGradeType: string;
    memberSeq: number;
    name: string;
    nickname: string;
    snsType: string;
  };
  answerManager: {
    managerSeq: number;
    name: string;
  };
  answerCreatedAt: string;
  createdAt: string;
}

interface IContactDetail {
  contactSeq: number;
  contactType: string;
  contactStatusType: string;
  title: string;
  content: string;
  contactMember: {
    id: string;
    memberGradeType: string;
    memberSeq: number;
    name: string;
    nickname: string;
    phone: string;
    snsType: string;
  };
  answerManager: {
    managerSeq: number;
    name: string;
  };
  answerCreatedAt: string;
  answer: {
    answerSeq: number;
    content: string;
    createdAt: string;
  };
  createdAt: string;
}

export {
  IContact, IContactDetail
};

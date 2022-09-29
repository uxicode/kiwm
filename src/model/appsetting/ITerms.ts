//약관목록 및 조회(상세)
interface ITerms {
 content: string;
 createdAt: string | Date;
 effectiveDate: string | Date;
 emailSendDate: string;
 histSeq: number;
 isUse:  boolean;
 requiredYn: string;
 termOrder: number;
 termSeq: number;
 termType: string;
 termVer: string;
 title: string;
 updDate: string;
}

//약관등록
interface ITermsForm{
  content:string;
  effectiveDate: string | Date;
  requiredYn: string;
  termOrder: number;
  termSeq: number;
  termType: string;
  title: string;
  version: string;
  
}

//약관수정
interface ITermsDetailForm{
  content: string;
  effectiveDate: string | Date;
  version: string;
}

//약관 상세 - 수정 내역(팝업)
interface ITermsModifyList {
  histSeq: number;
  managerName: string;
  managerSeq: number;
  termSeq: number;
  termVer: string,
  updDate: string | Date;
}

// 순서 정렬
interface ITermsSortList {
  termOrder: number;
  termSeq: number;
}

export {ITerms, ITermsForm, ITermsDetailForm, ITermsModifyList, ITermsSortList};

interface IMembership {
    pointSeq: number;
    nickNm: string;
    telNo: string;
    userId: string;
    gradeStartAt: string;
    gradeEndAt: string;
    userSeq: number;
    pointSum: number;
    accumPoint: string;
    userNm: string;
    userSts: string;
    userGrade: string;
}

interface IMembershipDetail {
    gradeEndAt: string;
    gradeStartAt: string;
    nickNm: string;
    pointSum: number;
    telNo: string;
    userGrade: string;
    userGradeEngName: string;
    userGradeName: string;
    userId: string;
    userNm: string;
    userSeq: number;
}

interface IPointHistory {
    rownum: number;
    pointKind: string;
    addPoint: number;
    subPoint: number;
    accumPoint: number;
    pointDate: string;
}

export {
    IMembership, IMembershipDetail, IPointHistory
};

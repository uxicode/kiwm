interface IAgreements {
    isAgreement: true;
    termsType: string;
}

interface INotifications {
    isAgreement: boolean;
    notificationType: string;
}

interface IUserDetail {
    address: string;
    addressDetail: string;
    age: number;
    agreements: IAgreements[];
    birthdate: string;
    createdAt: string;
    gender: string;
    id: string;
    lastLoginAt: string;
    memberGradeType: string;
    memberSeq: number;
    memberStatusType: string;
    name: string;
    nickname: string;
    notifications: INotifications[];
    phone: string;
    point: number;
    profilePath: string;
    reportPostCount: number;
    reportReplyCount: number;
    snsType: string;
    zipcode: string;
    memo: string;
    memberPostCount: number;
    memberGeneralEventApplyCount: number;
    memberLiveEventApplyCount: number;
    memberCheckinCount: number;
}

interface IWithDrawalMember{
    memberQuitType: string;
    memberSeq: number;
    memberStatusType: string;
    memo: string;
    nickname: string;
    quitAt: string;
}

export { IUserDetail, IAgreements, INotifications, IWithDrawalMember };

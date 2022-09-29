

// 회원관리 필터  query 타입
export enum UserFilterTypes{
    MEMBER_STATUS_TYPE='memberStatusType',
    GENDER_TYPE ='genderType',
    AGE_BAND_TYPE='agebandType',
    MEMBER_QUERY_TYPE='memberQueryType'
}
//1:1문의 필터 query 타입
export enum ContactFilterTypes{
    CONTACT_TYPE='contactType',
    CONTACT_STATUS_TYPE ='contactStatusType',
    CONTACT_QUERY_TYPE='contactQueryType',
    START_AT='startDateAt',
    END_AT='endDateAt'
}
//경품관리 필터 query 타입
export enum ItemFilterTypes{
    ITEM_TYPE='itemType',
    ITEM_STATUS_TYPE='itemStatusType'
}

// 멤버쉽 이력관리 필터
export enum MembershipFilterTypes {
    GRADE_QUERY_TYPE='gradeQueryType',
    POINT_QUERY_TYPE='pointQueryType',
    ADD_TYPE='addType',
    KIND_QUERY_TYPE='kindQueryType',
    START_DATE_AT='startDateAt',
    END_DATE_AT='endDateAt'
}

// Push 필터
export enum PushFilterTypes {
    PUSH_TYPE='pushType',
    PUSH_DETAIL_TYPE='pushDetailType',
    PUSH_SEND_TYPE='pushSendType',
    PUSH_SEND_STATUS_TYPE='pushSendStatusType',
    PUSH_QUERY_TYPE='pushQueryType',
    START_DATE_AT='startDateAt',
    END_DATE_AT='endDateAt'
}

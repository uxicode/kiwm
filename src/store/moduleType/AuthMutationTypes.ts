enum TokenMutationType {
    GET_TOKEN='GET_TOKEN',
    GET_REFRESH_TOKEN='GET_REFRESH_TOKEN',
    SIGN_IN_BY_TOKEN='SIGN_IN_BY_TOKEN'
}

enum UserMutationType {
    INFO='INFO',
    LOGOUT='LOGOUT',
    LOG_IN='LOG_IN',
    ERROR_LOG='ERROR_LOG',
    INFO_UPDATE='INFO_UPDATE'
}

enum PageAuthMutationType{
    IS_AUTH='IS_AUTH'
}


export { TokenMutationType, UserMutationType, PageAuthMutationType };

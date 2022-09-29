interface IPush {
    pushSeq: number;
    pushType: string;
    pushDetailType: string;
    pushSendType: string;
    pushSendStatusType: string;
    pushTargetType: string;
    title: string;
    content: string;
    sendManager: {
        managerSeq: number;
        id: string;
        name: string;
    };
    sendDateAt: string;
    sendTimeAt: string;
}

interface IPushDetail {
    pushSeq: number;
    pushType: string;
    pushDetailType: string;
    pushSendType: string;
    pushSendStatusType: string;
    pushTargetType: string;
    title: string;
    content: string;
    sendManager: {
        managerSeq: number;
        id: string;
        name: string;
    };
    sendDateAt: string;
    sendTimeAt: string;
    url: string;
    eventSeq: number;
    pushErrors: Array<{
       errorCode: string,
       errorCodeText: string,
       members: Array<{
           memberSeq: number,
           id: string,
           name: string
       }>
    }>;
}

interface IEmail {
    emailSeq: number;
    emailType: string;
    emailCaseType: string;
    emailCaseDetailType: string;
    sendDateAt: string;
    sendTimeAt: string;
}

interface IEmailPush {
  effectiveDateAt: string;
}

interface IEmailTemplate {
  emailCaseDetailType: string;
  emailCaseType: string;
  emailSenderType: string;
  emailType: string;
  title: string;
}

export {IPush, IPushDetail, IEmail, IEmailPush, IEmailTemplate};

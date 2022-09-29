interface IAdminAuthMenu {
    id: string;
    name: string;
    isView: boolean;
}

interface IAdminUserMe {
    userSeq: number;
    id: string;
    name: string;
    email: string;
    authorities: string[],
    createdAt: string,
    isSystem: boolean,
    menus: IAdminAuthMenu[],
}


export { IAdminUserMe, IAdminAuthMenu };

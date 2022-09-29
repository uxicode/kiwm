interface IAdminDetail{
    managerSeq: number;
    id: string;
    name: string;
    email: string;
    createdAt: string | Date;
    authorities: string[];
    menus: Array<{
        name: string,
        isView: boolean,
        menus:Array<{id: string, name: string, isView: boolean}>
    }>
}

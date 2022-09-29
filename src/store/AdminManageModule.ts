import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IAdmin } from '@/model/admin/IAdmin';
import { AdminManageMutationType } from '@/store/moduleType/AdminManageMutationType';
import { AdminManageActionType } from '@/store/moduleType/AdminManageActionType';
import { UserMgMutationType } from '@/store/moduleType/UserManageMutationType';
import { AdminService } from '@/restApi/service/AdminService';
import { namespace } from 'vuex-class';
import { ICrowd } from '@/model/admin/ICrowd';
import { CrowdService } from '@/restApi/service/CrowdService';



@Module( {
  namespaced: true,
} )
export default class AdminManageModule extends VuexModule {

    private admins: IAdmin[]=[];
    private crowdItems: ICrowd[]=[];
    private crowdDetail: ICrowd | null=null;
    private adminTotalNum: number=0;
    private adminPageEndNum: number=0;
    private adminPageSizeNum: number=0;
    private pwdChk: boolean=false;

    private adminDetailItem: IAdminDetail | null=null;

    get isPwdChk(): boolean {
        return this.pwdChk;
    }

    get adminList(): IAdmin[] {
        return this.admins;
    }

    get adminTotal(): number {
        return this.adminTotalNum;
    }

    get adminPageEnd(): number {
        return this.adminPageEndNum;
    }

    get adminPageSize(): number {
        return this.adminPageSizeNum;
    }

    get adminDetailData(): IAdminDetail | null{
        return this.adminDetailItem;
    }

    get crowdList(): ICrowd[] {
        return this.crowdItems;
    }

    get crowdDetailItem(): ICrowd | null{
        return this.crowdDetail;
    }

    @Mutation
    public [AdminManageMutationType.PASSWORD_CHANGE]( chk: boolean): void {
        // console.log('token=', this.token);
        this.pwdChk=chk;
    }

    @Mutation
    public [AdminManageMutationType.SET_LIST](admins: IAdmin[]): void {
        // console.log('token=', this.token);
        this.admins=admins;
    }

    @Mutation
    public [AdminManageMutationType.ADMIN_TOTAL](total: number): void {
        // console.log('token=', this.token);
        this.adminTotalNum=total;
    }

    @Mutation
    public [AdminManageMutationType.ADMIN_PAGE_SIZE](num: number): void {
        // console.log('token=', this.token);
        this.adminPageSizeNum=num;
    }

    @Mutation
    public [AdminManageMutationType.ADMIN_PAGE_END](num: number): void {
        // console.log('token=', this.token);
        this.adminPageEndNum=num;
    }

    @Mutation
    public [AdminManageMutationType.UPDATE_LIST](items: { admins: IAdmin[], count: number, size: number, end: number }): void {
        // console.log('token=', this.token);
        const { admins, count, size, end }=items;
        this.admins=admins;
        this.adminTotalNum=count;
        this.adminPageSizeNum=size;
        this.adminPageEndNum=end;
    }

    @Mutation
    public [AdminManageMutationType.ADMIN_DETAIL](adminData: IAdminDetail): void {
        // console.log('token=', this.token);
        this.adminDetailItem=adminData;
    }

    @Mutation
    public [AdminManageMutationType.UPDATE_CROWD_LIST](crowdItems: ICrowd[]): void {
        this.crowdItems=crowdItems;
        // console.log( '혼잡도 리스트=', this.crowdItems );
    }

    @Mutation
    public [AdminManageMutationType.UPDATE_CROWD_DETAIL](crowdDetail: ICrowd): void {
        this.crowdDetail=crowdDetail;
        // console.log( '혼잡도 상세=', this.crowdDetail );
    }

    @Action( { rawError: true } )
    public [AdminManageActionType.ADMIN_DETAIL_VIEW]( id: number ): Promise<IAdminDetail> {

        return AdminService.getAdminDetail( id )
            .then( (data: any)=>{
                this.context.commit( AdminManageMutationType.ADMIN_DETAIL, data );
                return Promise.resolve( data );
            } );
    }

    @Action( { rawError: true } )
    public [AdminManageActionType.LIST](payload: {
        page: number,
        query?: string,
        managerQueryType?: string,
    }): Promise<IAdmin[]> {
        const { page, query, managerQueryType }=payload;
        return AdminService.getManageList(  page, { query, managerQueryType }  )
            .then( (data: any)=>{
                this.context.commit( AdminManageMutationType.UPDATE_LIST,
                    {
                        admins: data.contents,
                        count: data.contentCount,
                        size: data.pageSize,
                        end: data.pageEnd
                    } );

                return Promise.resolve( data.contents );
            } );
    }

    @Action( { rawError: true } )
    public [AdminManageActionType.CROWD_LIST](payload: {
        level?: string,
        zoneType?: string,
    }): Promise<ICrowd[]> {
        return CrowdService.getList(  payload  )
            .then( (data: ICrowd[])=>{
                // console.log( '혼잡도 리스트=', data );
                this.context.commit( AdminManageMutationType.UPDATE_CROWD_LIST, data );
                return Promise.resolve( data );
            } );
    }

}

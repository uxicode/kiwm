import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { UserService } from '@/restApi';
import { IUser } from '@/model/users/IUser';
import { UserMgMutationType } from '@/store/moduleType/UserManageMutationType';
import { UserMgActionType } from '@/store/moduleType/UsersManageActionType';


@Module( {
    namespaced: true,
} )
export default class UserManageModule extends VuexModule {

    private users: IUser[]=[];
    private userTotalNum: number=0;
    private userPageEndNum: number=0;
    private userPageSizeNum: number=0;

    private selectedFilterOptions: { [key: string]: string }={};
    private filterChk: boolean=false;

    get isFilter(): boolean{
        return this.filterChk;
    }

    get selectedFilterData() {
        return this.selectedFilterOptions;
    }

    get userList(): IUser[] {
        return this.users;
    }

    get userTotal(): number {
        return this.userTotalNum;
    }

    get userPageEnd(): number {
        return this.userPageEndNum;
    }

    get userPageSize(): number {
        return this.userPageSizeNum;
    }

    @Mutation
    public [UserMgMutationType.IS_FILTER]( isFilter: boolean ): void {
        this.filterChk=isFilter;
    }

    @Mutation
    public [UserMgMutationType.SET_FILTER]( filterOptions: {[key: string]: string} ): void {
        this.selectedFilterOptions=filterOptions;
    }

    @Mutation
    public [UserMgMutationType.RESET_FILTER](): void {
        this.filterChk=false;
    }

    @Mutation
    public [UserMgMutationType.SET_LIST](users: IUser[]): void {
        // console.log('token=', this.token);
        this.users=users;
    }

    @Mutation
    public [UserMgMutationType.UPDATE_LIST](items: { users: IUser[], count: number, size: number, end: number }): void {
        // console.log('token=', this.token);
        const { users, count, size, end }=items;
        this.users=users;
        this.userTotalNum=count;
        this.userPageSizeNum=size;
        this.userPageEndNum=end;
    }

    @Action( { rawError: true } )
    public [UserMgActionType.LIST](payload: {
        page: number,
        memberStatusTypes?: string,
        genderTypes?: string,
        agebandTypes?: string,
        memberQueryType?: string,
        query?: string,
    }): Promise<IUser[]> {
        return UserService.getMemberList( payload )
            .then( (data: any)=>{
                this.context.commit( UserMgMutationType.UPDATE_LIST,
                    {
                        users: data.contents,
                        count: data.contentCount,
                        size: data.pageSize,
                        end: data.pageEnd
                    } );

                return Promise.resolve( data.contents );
            } );

    }

}

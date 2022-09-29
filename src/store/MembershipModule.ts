import {IMembership, IMembershipDetail, IPointHistory} from '@/model/membership/IMembership';
import {MembershipActionType} from '@/store/moduleType/MembershipActionType';
import {MembershipMutationType} from '@/store/moduleType/MembershipMutationType';
import {Promise} from 'es6-promise';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { MembershipService } from '@/restApi/service/MembershipService';

@Module({
    namespaced: true
})
export default class MembershipModule extends VuexModule {

    // 멤버십 멤버 목록
    private membershipItems: IMembership[] = [];
    private membershipListTotalNum: number = 0;
    private membershipListPageSizeNum: number = 0;
    private membershipListPageEndNum: number = 0;

    // 멤버십 상세
    private membershipDetailData: IMembershipDetail | null = null;

    // 포인트 내역
    private pointHistoryItems: IPointHistory[] = [];
    private pointHistoryListTotalNum: number = 0;
    private pointHistoryListPageSizeNum: number = 0;
    private pointHistoryListPageEndNum: number = 0;

    get membershipList(): IMembership[] {
        return this.membershipItems;
    }

    get membershipListTotal(): number {
        return this.membershipListTotalNum;
    }

    get membershipListPageSize(): number {
        return this.membershipListPageSizeNum;
    }

    get membershipListPageEnd(): number {
        return this.membershipListPageEndNum;
    }

    get membershipDetail(): IMembershipDetail | null {
        return this.membershipDetailData;
    }

    get pointHistoryList(): IPointHistory[] {
        return this.pointHistoryItems;
    }

    get pointHistoryListTotal(): number {
        return this.pointHistoryListTotalNum;
    }

    get pointHistoryPageSize(): number {
        return this.pointHistoryListPageSizeNum;
    }

    get pointHistoryPageEnd(): number {
        return this.pointHistoryListPageEndNum;
    }

    @Mutation
    private [MembershipMutationType.UPDATE_MEMBERSHIP_LIST](items: {
        membershipItems: IMembership[], count: number, size: number, end: number
    }): void {
        const {membershipItems, count, size, end} = items;
        this.membershipItems = membershipItems;
        this.membershipListTotalNum = count;
        this.membershipListPageSizeNum = size;
        this.membershipListPageEndNum = end;
    }

    @Mutation
    private [MembershipMutationType.UPDATE_MEMBERSHIP_DETAIL](data: IMembershipDetail): void {
        this.membershipDetailData = data;
    }

    @Mutation
    private [MembershipMutationType.UPDATE_POINT_HISTORY](items: {
        pointHistoryItems: IPointHistory[], count: number, size: number, end: number
    }): void {
        const {pointHistoryItems, count, size, end} = items;
        this.pointHistoryItems = pointHistoryItems;
        this.pointHistoryListTotalNum = count;
        this.pointHistoryListPageSizeNum = size;
        this.pointHistoryListPageEndNum = end;
    }

    @Action({rawError: true})
    private [MembershipActionType.MEMBERSHIP_LIST](payload: {
        page?: number,
        filterInfo?: { [key: string]: string }
    }): Promise<any> {
        const {page, filterInfo} = payload;
        return MembershipService.getMembershipList({page, ...filterInfo})
            .then((data: any) => {
               this.context.commit(MembershipMutationType.UPDATE_MEMBERSHIP_LIST, {
                   membershipItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
               });
               return Promise.resolve(data);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    private [MembershipActionType.MEMBERSHIP_DETAIL_VIEW](userSeq: number): Promise<any> {
        return MembershipService.getMembershipDetail(userSeq)
            .then((data: any) => {
                this.context.commit(MembershipMutationType.UPDATE_MEMBERSHIP_DETAIL, data);
                return Promise.resolve(data);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    private [MembershipActionType.POINT_HISTORY_LIST](payload: {
        userSeq: string,
        addType?: string,
        kindQueryType?: string,
        startDateAt?: string,
        endDateAt?: string,
        page?: number
    }): Promise<any> {
        return MembershipService.getPointHistory(payload)
            .then((data: any) => {
               this.context.commit(MembershipMutationType.UPDATE_POINT_HISTORY, {
                   pointHistoryItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
               });
               return Promise.resolve(data.contents);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

}

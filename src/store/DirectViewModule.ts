import {ICheckIn, ICheckInDetail} from '@/model/directview/ICheckin';
import {DirectViewService} from '@/restApi/service/DirectViewService';
import {DirectViewActionType} from '@/store/moduleType/DirectViewActionType';
import {DirectViewMutaionType} from '@/store/moduleType/DirectViewMutaionType';
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {IVictory} from "@/model/directview/IVictory";

@Module({
    namespaced: true,
})
export default class DirectViewModule extends VuexModule {

    // 직관
    private checkinItems: ICheckIn[] = [];
    private checkinListTotalNum: number = 0;
    private checkinListPageSizeNum: number = 0;
    private checkinListPageEndNum: number = 0;
    private checkinDetailData: ICheckInDetail | null = null;

    get checkinList(): ICheckIn[] {
        return this.checkinItems;
    }

    get checkinListTotal(): number {
        return this.checkinListTotalNum;
    }

    get checkinListPageSize(): number {
        return this.checkinListPageSizeNum;
    }

    get checkinListPageEnd(): number {
        return this.checkinListPageEndNum;
    }

    get checkinDetail(): ICheckInDetail | null {
        return this.checkinDetailData;
    }




  // 직관승요
  private victoryItems: IVictory[] = [];
  private victoryListTotalNum: number = 0;
  private victoryListPageSizeNum: number = 0;
  private victoryListPageEndNum: number = 0;

  get victoryList(): IVictory[] {
    return this.victoryItems;
  }

  get victoryListTotal(): number {
    return this.victoryListTotalNum;
  }

  get victoryListPageSize(): number {
    return this.victoryListPageSizeNum;
  }

  get victoryListPageEnd(): number {
    return this.victoryListPageEndNum;
  }
  
  
  

    @Mutation
    private [DirectViewMutaionType.UPDATE_CHECKIN_LIST](items: {
        checkinItems: ICheckIn[], count: number, size: number, end: number
    }): void {
        const {checkinItems, count, size, end} = items;
        this.checkinItems = checkinItems;
        this.checkinListTotalNum = count;
        this.checkinListPageSizeNum = size;
        this.checkinListPageEndNum = end;
    }

    //직관승요
    @Mutation
    private [DirectViewMutaionType.UPDATE_VICTORY_LIST](items: {
      victoryItems: IVictory[], count: number, size: number, end: number
    }): void {
      const {victoryItems, count, size, end} = items;
      this.victoryItems = victoryItems;
      this.victoryListTotalNum = count;
      this.victoryListPageSizeNum = size;
      this.victoryListPageEndNum = end;
    }
    
    @Mutation
    private [DirectViewMutaionType.UPDATE_CHECKIN_DETAIL](data: ICheckInDetail) {
        this.checkinDetailData = data;
    }

    @Action({rawError: true})
    private [DirectViewActionType.CHECKIN_LIST](payload: {
        page?: number,
        memberSeq?: number,
        filterInfo?: { [key: string]: string }
    }): Promise<any> {
        return DirectViewService.getCheckinList(payload)
            .then((data: any) => {
               this.context.commit(DirectViewMutaionType.UPDATE_CHECKIN_LIST, {
                   checkinItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
               });
               return Promise.resolve(data.contents);
            });
    };

      //직관승요
      @Action({rawError: true})
      private [DirectViewActionType.VICTORY_LIST](payload: {
        page?: number,
        filterInfo?: { [key: string]: string }
      }): Promise<any> {
        return DirectViewService.getVictoryList(payload)
          .then((data: any) => {
            this.context.commit(DirectViewMutaionType.UPDATE_VICTORY_LIST, {
              victoryItems: data.contents,
              count: data.contentCount,
              size: data.pageSize,
              end: data.pageEnd
            });
            return Promise.resolve(data.contents);
          });
      };

    @Action({rawError: true})
    public [DirectViewActionType.CHECKIN_DETAIL_VIEW](checkinSeq: number): Promise<ICheckInDetail> {
        return DirectViewService.getCheckinDetail(checkinSeq)
            .then((data: ICheckInDetail) => {
                this.context.commit(DirectViewMutaionType.UPDATE_CHECKIN_DETAIL, data);
                return Promise.resolve(data);
            });
    }

}

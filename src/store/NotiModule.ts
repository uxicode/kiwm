import {IGeneral} from '@/model/event/IGeneral';
import {ILive} from '@/model/event/ILive';
import {IEmail, IEmailTemplate, IPush, IPushDetail} from '@/model/notification/INotification';
import {NotiService} from '@/restApi/service/NotiService';
import {NotiActionType} from '@/store/moduleType/NotiActionType';
import {NotiMutationType} from '@/store/moduleType/NotiMutationType';
import {Promise} from 'es6-promise';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import {AppSettingActionType} from "@/store/moduleType/AppSettingActionType";
import {AppSettingService} from "@/restApi";
import {ITerms} from "@/model/appsetting/ITerms";
import {AppSettingMutationType} from "@/store/moduleType/AppSettingMutationType";

@Module({
  namespaced: true
})
export default class NotiModule extends VuexModule {
  private pushItems: IPush[] = [];
  private pushListTotalNum: number=0;
  private pushListPageSizeNum: number=0;
  private pushListPageEndNum: number=0;
  private pushDetailData: IPushDetail | null = null;

  private liveEventCode: string = 'C01';
  private generalEventCode: string = 'C02';
  private liveEventItems: ILive[] = [];
  private generalEventItems: IGeneral[] = [];

  private emailItems: IEmail[] = [];
  private emailListTotalNum: number=0;
  private emailListPageSizeNum: number=0;
  private emailListPageEndNum: number=0;

  private emailTemplateItems: IEmailTemplate[] = [];
  private emailTemplateTotalNum: number=0;
  
  private emailPage: string = '';
  
  get pushList(): IPush[] {
    return this.pushItems;
  }

  get pushListTotal(): number {
    return this.pushListTotalNum;
  }

  get pushListPageSize(): number {
    return this.pushListPageSizeNum;
  }

  get pushListPageEnd(): number {
    return this.pushListPageEndNum;
  }

  get pushDetail(): IPushDetail | null {
    return this.pushDetailData;
  }

  get liveEventList(): ILive[] {
    return this.liveEventItems;
  }

  get generalEventList(): IGeneral[] {
    return this.generalEventItems;
  }

  get emailList(): IEmail[] {
    return this.emailItems;
  }

  get emailListTotal(): number {
    return this.emailListTotalNum;
  }

  get emailListPageSize(): number {
    return this.emailListPageSizeNum;
  }

  get emailTemplate(): IEmailTemplate[] {
    return this.emailTemplateItems;
  }

  get emailTemplateTotal(): number {
    return this.emailTemplateTotalNum;
  }
  
  get currentEmailPage(): string {
    return this.emailPage;
  }


  @Mutation
  public [NotiMutationType.UPDATE_PUSH_LIST](items: {
    pushItems: IPush[], count: number, size: number, end: number
  }): void {
    const {pushItems, count, size, end} = items;
    this.pushItems = pushItems;
    this.pushListTotalNum = count;
    this.pushListPageSizeNum = size;
    this.pushListPageEndNum = end;
  }

  @Mutation
  public [NotiMutationType.UPDATE_PUSH_DETAIL](data: IPushDetail): void {
    this.pushDetailData = data;
  }

  @Mutation
  public [NotiMutationType.UPDATE_LIVE_EVENT_LIST](data: ILive[]): void {
    this.liveEventItems = data;
  }

  @Mutation
  public [NotiMutationType.UPDATE_GENERAL_EVENT_LIST](data: IGeneral[]): void {
    this.generalEventItems = data;
  }

  @Mutation
  public [NotiMutationType.UPDATE_EMAIL_LIST](items: {
    emailItems: IEmail[], count: number, size: number, end: number
  }): void {
    const {emailItems, count, size, end} = items;
    this.emailItems = emailItems;
    this.emailListTotalNum = count;
    this.emailListPageSizeNum = size;
    this.emailListPageEndNum = end;
  }

  @Mutation
  public [NotiMutationType.UPDATE_EMAIL_TEMPLATE](items: { emailTemplateItems: IEmailTemplate[]}): void {
    const {emailTemplateItems} = items;
    this.emailTemplateItems = emailTemplateItems;
  }

  @Mutation
  public [NotiMutationType.UPDATE_EMAIL_PAGE](emailPage: string) {
    this.emailPage = emailPage;
  }

  @Action({rawError: true})
  public [NotiActionType.PUSH_LIST](payload: {
    page?: number,
    filterInfo?: { [key: string]: string }
  }): Promise<any> {
    return NotiService.getPushList(payload)
      .then((data: any) => {
        this.context.commit(NotiMutationType.UPDATE_PUSH_LIST, {
          pushItems: data.contents,
          count: data.contentCount,
          size: data.pageSize,
          end: data.pageEnd
        });
        return Promise.resolve(data.contents);
      });
  }

  @Action({rawError: true})
  public [NotiActionType.PUSH_DETAIL_VIEW](pushSeq: number): Promise<any> {
    return NotiService.getPushDetail(pushSeq)
      .then((data: IPushDetail) => {
        this.context.commit(NotiMutationType.UPDATE_PUSH_DETAIL, data);
        return Promise.resolve(data);
      });
  }

  @Action({rawError: true})
  public [NotiActionType.LIVE_EVENT_LIST](): Promise<ILive[]> {
    return NotiService.getPushEventList(this.liveEventCode)
      .then((data: any) => {
        this.context.commit(NotiMutationType.UPDATE_LIVE_EVENT_LIST, data);
        return Promise.resolve(data);
      });
  }

  @Action({rawError: true})
  public [NotiActionType.GENERAL_EVENT_LIST](): Promise<IGeneral[]> {
    return NotiService.getPushEventList(this.generalEventCode)
      .then((data: any) => {
        this.context.commit(NotiMutationType.UPDATE_GENERAL_EVENT_LIST, data);
        return Promise.resolve(data);
      });
  }

  @Action({rawError: true})
  public [NotiActionType.EMAIL_LIST](payload: {
    page?: number,
    filterInfo?: { [key: string]: string}
  }): Promise<any> {
    return NotiService.getEmailList(payload)
      .then((data: any) => {
        this.context.commit(NotiMutationType.UPDATE_EMAIL_LIST, {
          emailItems: data.contents,
          count: data.contentCount,
          size: data.pageSize,
          end: data.pageEnd
        });
        return Promise.resolve(data.contents);
      });
  }


  @Action({rawError: true})
  public [NotiActionType.EMAIL_TEMPLATE](): Promise<any> {
    return NotiService.getEmailTemplateList()
      .then((data: IEmailTemplate[]) => {
        // console.log(data);
        this.context.commit(NotiMutationType.UPDATE_EMAIL_TEMPLATE, {emailTemplateItems: data});
        return Promise.resolve(data);
      });
  }

}


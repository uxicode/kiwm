import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {AppSettingService, EventService} from '@/restApi';
import {INotice} from '@/model/appsetting/INotice';
import {ITerms, ITermsModifyList} from '@/model/appsetting/ITerms';
import {IVersion} from "@/model/appsetting/IVersion";
import {IFaq, IFaqDetailForm} from "@/model/appsetting/IFaq";
import {AppSettingMutationType} from '@/store/moduleType/AppSettingMutationType';
import {AppSettingActionType} from '@/store/moduleType/AppSettingActionType';


@Module({
  namespaced: true,
})
export default class AppSettingManageModule extends VuexModule {

  //공지사항
  private notices: INotice[] = [];
  private noticeTotalNum: number = 0;
  private noticePageEndNum: number = 0;
  private noticePageSizeNum: number = 0;
  private pwdChk: boolean = false;
  private filterChk: boolean = false;
  private selectedFilterOptions: { [key: string]: string } = {};
  private notice: INotice | null = null;

  //약관
  private termses: ITerms[] = [];
  private termsTotalNum: number = 0;
  private term: ITerms | null = null;
  private termModifyListItems: ITermsModifyList[] = [];


  //버전
  private versionInfo: IVersion | null=null;



  //자주묻는질문
  private faqFilterType: string = 'EV';
  private faqs: IFaq[]=[];
  private faqTotalNum: number = 0;
  private faq: IFaq | null = null;
  private faqDetails: IFaqDetailForm | null = null;


//test
  get currentfaqFilterType(): string {
    return this.faqFilterType;
  }

  get isPwdChk(): boolean {
    return this.pwdChk;
  }

  get noticeList(): INotice[] {
    return this.notices;
  }

  get noticeDetail(): INotice | null {
    return this.notice;
  }

  get noticeTotal(): number {
    return this.noticeTotalNum;
  }

  get noticePageEnd(): number {
    return this.noticePageEndNum;
  }

  get noticePageSize(): number {
    return this.noticePageSizeNum;
  }


  //약관
  get termsList(): ITerms[] {
    return this.termses;
  }

  get termsDetail(): ITerms | null {
    return this.term;
  }

  get termsTotal(): number {
    return this.termsTotalNum;
  }

  get termModifyList(): ITermsModifyList[] | null {
    return this.termModifyListItems;
  }


  //버전
  get versionInfoList(): IVersion | null {
    return this.versionInfo;
  }


  //자주묻는질문
  get faqList(): IFaq[] {
    return this.faqs;
  }

  get faqTotal(): number {
    return this.faqTotalNum;
  }

  get faqDetail(): IFaq | null {
    return this.faq;
  }

  //수정 interface 별도로 있어서 이것도 별개로 만듬
  get faqDetailForm(): IFaqDetailForm | null {
    return this.faqDetails;
  }



  @Mutation
  public [AppSettingMutationType.IS_FILTER](isFilter: boolean): void {
    this.filterChk = isFilter;
  }

  @Mutation
  public [AppSettingMutationType.SET_FILTER](filterOptions: { [key: string]: string }): void {
    this.selectedFilterOptions = filterOptions;
  }

  @Mutation
  public [AppSettingMutationType.RESET_FILTER](): void {
    this.filterChk = false;
  }

  @Mutation
  public [AppSettingMutationType.SET_LIST](notices: INotice[]): void {
    this.notices = notices;
  }

/*  //약관
  @Mutation
  public [AppSettingMutationType.SET_TERMS_LIST](termses: ITerms[]): void {
    this.termses = termses;
  }*/

  @Mutation
  public [AppSettingMutationType.UPDATE_TERMS_LIST](items: { termses: ITerms[]}): void {
    const {termses} = items;
    this.termses = termses;
  }

  //약관(수정상세화면팝업)
  @Mutation
  public [AppSettingMutationType.SET_DETAIL_MODIFY_LIST](termModifyListItems: ITermsModifyList[]): void {
    this.termModifyListItems = termModifyListItems;
  }

  @Mutation
  public [AppSettingMutationType.UPDATE_FAQ_LIST](payload: {faqs: IFaq[], count: number}): void {
    const {faqs, count} = payload;
    this.faqs = faqs;
    this.faqTotalNum = count;
  }


  @Mutation
  public [AppSettingMutationType.NOTICE_PAGE_SIZE](num: number): void {
    this.noticePageSizeNum = num;
  }

  @Mutation
  public [AppSettingMutationType.UPDATE_LIST](items: { notices: INotice[], count: number, size: number, end: number }): void {
    // console.log('token=', this.token);
    const {notices, count, size, end} = items;
    this.notices = notices;
    this.noticeTotalNum = count;
    this.noticePageSizeNum = size;
    this.noticePageEndNum = end;
  }

  @Mutation
  public [AppSettingMutationType.SET_NOTICE_DETAIL](notice: INotice): void {
    this.notice = notice;
  }


  @Mutation
  public [AppSettingMutationType.SET_TERMS_DETAIL](term: ITerms): void {
    this.term = term;
  }


  //자주묻는질문 mutation
  @Mutation
  public [AppSettingMutationType.SET_FAQ_DETAIL](faqDetails: IFaqDetailForm): void {
    this.faqDetails = faqDetails;
  }

  //UPDATE_APP_VERSION_LIST
    @Mutation
    public [AppSettingMutationType.UPDATE_APP_VERSION_LIST]( versionInfo: IVersion ): void {
        this.versionInfo = versionInfo;
    }

  @Action({rawError: true})
  public [AppSettingActionType.NOTICE_LIST](payload:{
      page?: number,
      postYn?: string,
      query?: string,
      regDateForm?: string,
      regDateTo?: string,
  }): Promise<any> {
    return AppSettingService.getNoticeList(payload)
      .then((data: any) => {
        // console.log(data);
        this.context.commit(AppSettingMutationType.UPDATE_LIST,
          {
            notices: data.contents,
            count: data.contentCount,
            size: data.pageSize,
            end: data.pageEnd
          });

        return Promise.resolve(data.contents);
      });
  }


  //공지
  @Action({rawError: true})
  public [AppSettingActionType.NOTICE_DETAIL](postSeq: number): Promise<INotice> {
    return AppSettingService.getNoticeDetail(postSeq)
      .then((data: INotice) => {
        // console.log(data);
        this.context.commit(AppSettingMutationType.SET_NOTICE_DETAIL, data);
        return Promise.resolve(data);
      });
  }

  //약관
  @Action({rawError: true})
  public [AppSettingActionType.TERMS_DETAIL](termSeq: number): Promise<ITerms> {
    return AppSettingService.getTermsDetail(termSeq)
      .then((data: ITerms) => {
        // console.log(data);
        this.context.commit(AppSettingMutationType.SET_TERMS_DETAIL, data);
        return Promise.resolve(data);
      });
  }

  //자주묻는질문관리
  @Action({rawError: true})
  public [AppSettingActionType.FAQ_DETAIL](postSeq: number): Promise<IFaqDetailForm> {
    return AppSettingService.getFaqDetail(postSeq)
      .then((data: IFaqDetailForm) => {
        // console.log(data);
        this.context.commit(AppSettingMutationType.SET_FAQ_DETAIL, data);
        return Promise.resolve(data);
      });
  }


 /* @Action({rawError: true})
  public [AppSettingActionType.NOTICE_FILTER_TO_LIST](payload: {
    page: number,
    filterInfo: { [key: string]: string }
  }): Promise<INotice[]> {
    const {page, filterInfo} = payload;

    this.context.commit(AppSettingMutationType.SET_FILTER, filterInfo);
    this.context.commit(AppSettingMutationType.IS_FILTER, true);

    return AppSettingService.getNoticeListFilterApply(page, filterInfo)
      .then((data: any) => {
        // console.log('filterToData=', data);
        this.context.commit(AppSettingMutationType.UPDATE_LIST, {
          notices: data.contents,
          count: data.contentCount,
          size: data.pageSize,
          end: data.pageEnd
        });
        return Promise.resolve(data.contents);
      });
  }*/



  //약관
  @Action({rawError: true})
  public [AppSettingActionType.TERMS_LIST](): Promise<any> {
    return AppSettingService.getTermsList()
      .then((data: ITerms[]) => {
        // console.log(data);
        this.context.commit(AppSettingMutationType.UPDATE_TERMS_LIST, {termses: data});
        return Promise.resolve(data);
      });
  }

  //약관(수정상세팝업)
  @Action({rawError: true})
  public [AppSettingActionType.TERMS_DETAIL_MODIFY_LIST](termSeq: number): Promise<any> {
    return AppSettingService.getTermsModifyDetailList(termSeq)
      .then((data: any) => {
        // console.log(data);
        this.context.commit(AppSettingMutationType.SET_DETAIL_MODIFY_LIST, data);
        return Promise.resolve(data);
      });
  }



 //자주묻는질문
  @Action( { rawError: true } )
  public [AppSettingActionType.FAQ_LIST](payload: {
    // page: number,
    faqType?: string,
  }): Promise<any> {
    return AppSettingService.getFaqList(payload)
      .then( (data: any)=>{
        this.context.commit( AppSettingMutationType.UPDATE_FAQ_LIST, {
          faqs: data.contents,
          count: data.contentCount,
        } );
        return Promise.resolve( data.contents );
      } );
  }


    @Action( { rawError: true } )
    public [AppSettingActionType.APP_VERSION_LIST](): Promise<any> {
        return AppSettingService.getAppVersionList()
            .then( (data: any)=>{
                this.context.commit( AppSettingMutationType.UPDATE_APP_VERSION_LIST, data );
                return Promise.resolve( data );
            } );
    }


}

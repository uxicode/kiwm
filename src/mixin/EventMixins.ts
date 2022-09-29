import { Component, Vue } from 'vue-property-decorator';
import { IBadgeColor } from '@/model/event/badge/IBadgeColor';
import { IFilter } from '@/model/filter/IFilter';
import { DataProvider, DataProviderType } from '@/core/data/DataProvider';
import { EventService, FileService } from '@/restApi';
import { ImageFileService } from '@/service/preview/ImageFileService';
import FilterService from '@/service/filter/FilterService';


@Component
export default class EventMixins extends Vue {

    public dataProvider: DataProvider=new DataProvider();
    public filterService: FilterService=new FilterService();
    public imgFileService: ImageFileService=new ImageFileService();


    //파일 전송을 위한 formData
    public formData: FormData=new FormData();

    //이벤트혜택/유형 선택( 상품형/참여형/포인트형 )
    public eventBenefitFilterItems: IFilter[]=[];
    //이벤트혜택 상세  ( 사인회/자선행사/캠핑/상품증정/포인트증정 )- 참여형 선택시만 보임.
    public eventDetailFilterItems: IFilter[]=[];
    //추첨유형/인원(선착순/선착순+랜덤/랜덤/수동)
    public eventDrawFilterItems: IFilter[]=[];
    //이벤트 마감( 진행예정/진행중/마감일/마감/추천완료/종료 )
    public eventStatusFilterItems: IFilter[]=[];
    //혜택유형 배지( itemDetailType 에 color 속성을 추가한 배열 )
    public itemBadgeColorByDetailType: IBadgeColor[]=[];
    //이벤트 상태 배지 컬러
    public badgeColorByStatusType: IBadgeColor[]=[];

    get imgFile(): string[] | string{
        return this.imgFileService.getItem();
    }

    public created() {

        this.eventBenefitFilterItems=this.dataProvider.getItem( DataProviderType.EVENT_BENEFIT_TYPE );
        //이벤트혜택 상세  ( 사인회/자선행사/캠핑/상품증정/포인트증정 )- 참여형 선택시만 보임.
        this.eventDetailFilterItems=this.dataProvider.getItem( DataProviderType.ITEM_DETAIL_TYPE );
        //추첨유형/인원(선착순/선착순+랜덤/랜덤/수동)
        this.eventDrawFilterItems=this.dataProvider.getItem( DataProviderType.EVENT_DRAW_TYPE );
        //이벤트 마감( 진행예정/진행중/마감일/마감/추천완료/종료 )
        this.eventStatusFilterItems=this.dataProvider.getItem( DataProviderType.EVENT_STATUS_TYPE );
        /*
        {val:'SI', txt:'사인회'},
       {val:'CH', txt:'자선행사'},
       {val:'CA', txt:'캠핑'},
       {val:'GO', txt:'상품증정'},
       {val:'PO', txt:'포인트증정'},
       */
        this.itemBadgeColorByDetailType=this.eventDetailFilterItems.map( (item)=>{
            let resultColor: string='';
            if (item.val === 'GO') {
                resultColor='badge-light-primary';
            } else if (item.val === 'PO') {
                resultColor='badge-light-success';
            } else {
                resultColor='badge-light-warning';
            }
            return {
                txt: item.txt,
                val: item.val,
                color: resultColor
            };
        } );

        this.badgeColorByStatusType=this.eventStatusFilterItems.map( (item)=>{
            let resultColor: string='';
            switch ( item.val ) {
                case DataProviderType.EVENT_STEP1:
                    //진행예정
                    resultColor='#53ba7d';
                    break;
                case DataProviderType.EVENT_STEP2:
                    //진행중
                    resultColor='#678ff0';
                    break;
                case DataProviderType.EVENT_STEP3:
                    //마감일
                    resultColor='#ff8700';
                    break;
                case DataProviderType.EVENT_STEP4:
                    //마감
                    resultColor='#c87eff';
                    break;
                case DataProviderType.EVENT_STEP5:
                    //추첨완료
                    resultColor='#ff7f7f';
                    break;
                case DataProviderType.EVENT_STEP6:
                    resultColor='#babfc7';
                    //종료
                    break;
            }
            return {
                txt: item.txt,
                val: item.val,
                color: resultColor
            };
        } );
    }


    /**
     *  //이벤트혜택/유형 선택( 상품형/참여형/포인트형 )
     * @param type
     */
    public getBenefitType(type: string) {
        const findItem=this.getFindItemByValue( this.eventBenefitFilterItems, type );
        return (findItem) ? findItem.txt : '';
    }

    /**
     * 이벤트 상태( 진행예정/진행중/마감일/마감/추천완료/종료 )
     * @param type
     */
    public getEventStatusType(type: string) {
        const findItem=this.getFindItemByValue( this.eventStatusFilterItems, type );
        // console.log( type, findItem );
        return (findItem) ? findItem.txt : '';
    }

    /**
     * 이벤트혜택 상세  ( 사인회/자선행사/캠핑/상품증정/포인트증정 )
     * @param type
     */
    public getEventDetailType(type: string) {
        const findItem=this.getFindItemByValue( this.eventDetailFilterItems, type );
        // console.log( type, findItem );
        return (findItem) ? findItem.txt : '';
    }


    /**
     *  //추첨유형/인원(선착순/선착순+랜덤/랜덤/수동)
     * @param type
     */
    public getEventDrawType(type: string) {
        const findItem=this.getFindItemByValue( this.eventDrawFilterItems, type );
        // console.log( type, findItem );
        return (findItem) ? findItem.txt : '';
    }

    public getIsManual(type: string) {
        return type === DataProviderType.DRAW_MANUAL;
    }

    /**
     * 이벤트 상태( 진행예정/진행중/마감일/마감/추천완료/종료 ) 대한 배지 컬러
     * @param type
     * @param cssProp
     */
    public getColorByEventType(type: string, cssProp: string='background-color') {
        const findItem=this.getFindItemByValue( this.badgeColorByStatusType, type );
        return (findItem) ? `${ cssProp }:${ findItem.color }` : '';
    }

    /**
     * 이벤트혜택/유형( 상품형/참여형/포인트형 ) 배지 컬러
     * @param type
     */
    public getEventBenefitsBadgeColor(type: string) {
        const findItem=this.getFindItemByValue( this.itemBadgeColorByDetailType, type );
        return (findItem) ? findItem.color : '';
    }

    /**
     * 공통 - 데이터 배열( IFilter 타입으로 구성된 것 위주) 에서 val 값이 같은 아이템만 추출
     * @param items
     * @param value
     */
    public getFindItemByValue(items: any[], value: string) {
        const findIdx=items.findIndex( (item)=>item.val === value );
        return (findIdx !== -1) ? items[findIdx] : null;
    }

    /* { val: 'C01', txt: '진행예정' },
    { val: 'C02', txt: '진행중' },
    { val: 'C03', txt: '마감일' },
    { val: 'C04', txt: '마감' },
    { val: 'C05', txt: '추첨완료' },
    { val: 'C06', txt: '종료' },*/
    /**
     * 진행예정인지 체크
     * @param type
     */
    public isExpectedEventDraw(type: string) {
        return type === DataProviderType.EVENT_STEP1;
    }

    /**
     * 진행예정 및 진행중 체크
     * @param type
     */
    public isEventProceeding(type: string) {
        return type === DataProviderType.EVENT_STEP1 || type === DataProviderType.EVENT_STEP2;
    }

    /**
     * 현재 마감 상태이지 체크 true -> 추첨하기 버튼상태를 보이기로 설정 해야 함.
     * @param type
     */
    public getEventDrawBtn(type: string) {
        return type === DataProviderType.EVENT_STEP4;
    }

    /**
     * 현재 추첨완료인지 체크 true -> 당첨발표하기 버튼상태를 보이기로 설정 해야 함.
     * @param type
     */
    public getIsEventWinner(type: string) {
        return type === DataProviderType.EVENT_STEP5;
    }

    /**
     * 이벤트 종료 상태
     * @param type
     */
    public getIsEventEnd(type: string) {
        return type ===DataProviderType.EVENT_STEP6;
    }

    /**
     * 마감 / 종료 일때만 저장하기 버튼 비활성.
     * @param type
     */
    public getIsDisabledSavedBtn(type: string) {
        return type === DataProviderType.EVENT_STEP4 ||  type ===DataProviderType.EVENT_STEP6;
    }

    /**
     * 현재 진헁예정 혹은 종료 인지 체크.
     * @param status
     */
    public getIsExpectedAndWinner(status: string) {
        return this.isExpectedEventDraw( status ) || this.getIsEventEnd( status );
    }

    /**
     * 현재 진헁중 혹은 마감일 인지 체크.
     * @param status
     */
    public getIsEvtProceedingAndDeadLine(status: string) {
        return status ===DataProviderType.EVENT_STEP2 || status === DataProviderType.EVENT_STEP3;
    }

    /**
     *   disable 시키기 / 마감/추첨완료/종료 시에만 true
     * @param status
     */
    public isDisabledToggleByEndEvent(status: string) {
        // console.log( status );
        return status === DataProviderType.EVENT_STEP4 ||
            status === DataProviderType.EVENT_STEP5 || status === DataProviderType.EVENT_STEP6;
    }

    /**
     *  마감일 / 마감/ 추첨완료 / 종료 4가지 중 하나의 상황일때 true
     * @param status
     */
    public isDisabledByDeadLine(status: string) {
        return status ===DataProviderType.EVENT_STEP3 || status === DataProviderType.EVENT_STEP4 ||
            status === DataProviderType.EVENT_STEP5 || status === DataProviderType.EVENT_STEP6;
    }

    /**
     * 추첨 완료 및 종료 체크
     * @param status
     */
    public getIsEventWinnerEndStatus(status: string) {
        return status === DataProviderType.EVENT_STEP5 || status === DataProviderType.EVENT_STEP6;
    }

    /**
     * 이벤트혜택이 포인트형이 아닌 거 찾기( 즉 상품형/참여형인 상황 )
     * @param value
     */
    public isPointEventType(value: string): boolean {
        return (value === DataProviderType.EVENT_POINT_TYPE);
    }

    /**
     * 추첨이 선착순+랜덤 인지 체크
     * @param type
     */
    public getIsMixedEventDraw(type: string) {
        return type === DataProviderType.DRAW_MIXED;
    }

    //start : 이미지 파일 설정 ================================================
    /**
     * 이미지 id 를 이용해 image URL 로 배치
     * @param uid
     */
    public getImage(uid: string) {
        return FileService.getImageFileView( uid );
    }

    //모델에 이미지 파일 추가
    public addFileToImage(files: FileList, selector: string) {
        this.imgFileService.load( files, selector, DataProviderType.FILE_APPEND_KEY );
    }

    public async savedImageToFetch(): Promise<string> {
        if (this.imgFileService.getFileItem() === null) {
            return 'none';
        }
        // console.log( this.formData.get( DataProviderType.FILE_APPEND_KEY ) );
        await this.imgFileService.save( this.formData, DataProviderType.FILE_APPEND_KEY );
        const uploadImageInfo=await EventService.uploadGeneralImage( this.formData );
        //await this.imgFilesClear(); ---> 반드시 최종 전송 완료후 호춣해야 함.
        return uploadImageInfo.id;
    }

    /**
     * 추가된 이미지 미리보기 파일 제거하기
     * @private
     */
    public onRemoveImgPreview(inputId: string): void {
        this.imgFileService.remove();
        const imgFileInput=document.querySelector( '#' + inputId ) as HTMLInputElement;
        imgFileInput.value='';
    }

    public onImageModify(inputId: string): void {
        const imgFileInput=document.querySelector( '#' + inputId ) as HTMLInputElement;
        imgFileInput.value='';
    }

    /**
     * post 등록을 완료후 formdata 및 배열에 지정되어 있던 데이터들 비우기..
     * @private
     */
    public imgFilesClear() {
        this.imgFileService.remove();
        this.formData.delete( DataProviderType.FILE_APPEND_KEY );
    }

    //end : 이미지 파일 설정 ================================================


   /* public onHistoryBack() {
        this.$router.go( -1 );
    }*/

}

import { Component, Vue } from 'vue-property-decorator';
import { Utils } from '@/utils/utils';
import dayjs from 'dayjs';

@Component
export default class UtilsMixins extends Vue {

    public txtAreaEleH(txtAreaEle: HTMLTextAreaElement, txt: string) {
        // const scheduleDetailAreaTxt=this.$refs.scheduleDetailAreaTxt as HTMLInputElement;

        let txtAreaSizeTotal=0;
        // tslint:disable-next-line:prefer-for-of
        for (let i=0; i < txt.length; i++) {
            //영문/한글 섞인 문자를 바이트 수 계산
            txtAreaSizeTotal+=Utils.getCharByteSize( txt.charAt( i ) );
        }
        const lineH=20;
        const maxTxtLen=117; //한줄에 최대한 들어갈 수 있는 텍스트의 바이트 수 - 영문/한글 섞인 계산된 바이트 수
        const lineInLen=txtAreaSizeTotal / maxTxtLen; //maxTxtLen , 즉 몇줄까지 입력되었는 지 라인 수 계산
        const numOfLine: number=(txt.match( /\n/g ) || []).length; // 엔터키가 몇개 들어 갔는 지 체크
        const resultH=lineH + (lineInLen + numOfLine) * lineH; //1줄 높이( 20px )+( 텍스트 입력 라인 수+엔터키 개수 ) * 1줄 높이( 20px )

        // txtAreaEle.style.height = String( Utils.autoResizeTextArea(txt) + 'px');
        txtAreaEle.style.height=resultH + 'px';
    }

    /**
     * //input click event 발생시키기.
     * @param targetSelector
     * @private
     */
    public inputEventBind(targetSelector: string) {
        //파일 input 에 클릭 이벤트 붙이기~
        const imgFileInput=document.querySelector( targetSelector ) as HTMLInputElement;
        //input click event 발생시키기.
        imgFileInput.dispatchEvent( Utils.createMouseEvent( 'click' ) );
    }

    /**
     * 모바일 번호 대시(-) 표기해 주기 -> "01012345678" 을 010-1234-5678 로~!
     * @param num
     */
    public getMobileFormat(num: string) {
        return Utils.getMobileDashFormat( num );
    }

    /**
     * 날짜 및 시간 표기 -> 2021-12-15T13:14:10  의 형태를 2021-12-15 14:10 로 변경해줌
     * @param date
     */
    public getDateAndTimesAt(date: string | Date): string {
        if (typeof date === 'string' && date === '') {
            return '-';
        }
        // console.log( typeof date, new Date(date) );
        return dayjs(date).format('YYYY-MM-DD HH:mm');////Utils.getFormatDateAndTimes( new Date( date ), '-' );
    }

    /**
     * 시간만 표기 ( - ) 20 : 10 ( 24 시간 타입으로 )
     * @param date
     */
    public getHourMinuteByDate(date: string | Date) {
        if (typeof date === 'string' && date === '') {
            return '-';
        }
        return dayjs(date).format('HH:mm');  ////Utils.getTimeColonFormat( new Date( date ).getHours(), new Date( date ).getMinutes() );
    }

    /**
     * 날짜 만 표기( - ) -> "2022-01-19T13:21:19" 을 2022-1-18 형태로 변경해줌
     * @param date
     */
    public getDate(date: string | Date=''): string{
        // const tDate=(typeof date === 'string') ? new Date( date ) : date;
        return dayjs(date===''? new Date() : date).format('YYYY-MM-DD');////Utils.getCustomFormatDate( tDate, '-' );
    }

    /**
     * 생년 월일에 점(.) 찍어 표기 -> "19850319" 을  2020.12.1 로 표기해줌
     * @param date
     */
    public getBirthAt(date: string | Date): string {
        /*let result: string='';
        if (typeof date === 'string') {
            if (date === '') {
                result='-';
            } else {
                const tDate=new Date( date ).toDateString().substr( 0, 12 );
                if (tDate === 'Invalid Date') {

                    if (date.length === 8) {
                        const year=date.substr( 0, 4 );
                        const month=date.substr( 4, 2 );
                        const day=date.substr( 6, 2 );
                        console.log( date, year, month, day );
                        result=Utils.getCustomFormatDate( new Date( `${ year }/${ month }/${ day }` ), '.', 0 );
                    }
                }
            }
        } else {
            result=Utils.getCustomFormatDate( new Date( date ), '.', 0 );
        }*/
        return dayjs(date).format('YYYY.MM.DD');////result;
    }

    /**
     * 오늘을 기준으로 년월일 출력
     */
    public getDateByToday() {
        return dayjs().format('YYYY-MM-DD'); ///Utils.getCustomFormatDate( new Date(), '-' );
    }

    /**
     * 오늘을 기준으로 년-월-일 시:분 출력
     */
    public getFullDateByToday() {
        return dayjs().format('YYYY-MM-DD HH:mm'); ///Utils.getCustomFormatDate( new Date(), '-' );
    }

    /**
     * 오늘을 기준으로 시간만 출력
     */
    public getTimeByToday() {
        return dayjs().format('HH:mm');////Utils.getTimeColonFormat( new Date().getHours(), new Date().getMinutes() );
    }


    /**
     * 오늘을 기준으로 시간값 가져오기
     */
    public getHourByToday() {
        return dayjs().get('h');
    }

    /**
     * 오늘을 기준으로 분값 가져오기
     */
    public getMinuteByToday() {
        return dayjs().get('m');
    }

    /**
     * 서버 쪽( java - LocalDateTime ) 형식을 따른 date type - ex) 2022-02-07T13:15:00
     * @param date
     */
    public setDateToServer( date: Date | string ) {
        return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
    }

    public getDiffTimes(date: any ) {
        const minutes=dayjs( date ).diff(dayjs(), 'm', true);
        const totalHours=Math.floor(Math.abs( minutes / 60));
        const totalMins=dayjs().minute(minutes).get('m');
        return `${ totalHours<10? '0'+totalHours : totalHours }:${ totalMins<10? '0'+totalMins : totalMins }`;
    }

    public getGeneralEventCountDayView( status: string, period:{ startTimeAt: string | Date, endTimeAt: string | Date, startDateAt?:string | Date, endDateAt?: string | Date } ) {
        /*
        { val: 'C01', txt: '진행예정' },  //이벤트 날짜( startDateAt )로 부터 오늘 기준으로 앞으로 몇일 + 로 남았는지 표기
        { val: 'C02', txt: '진행중' }, //오늘로부터 이벤트 날짜 ( endDateAt ) 기준으로 몇일 남았는지
        { val: 'C03', txt: '마감일' },  //당일 - 이벤트 날짜 ( endDateAt ) 기준 D-day 표시 하고  몇시간 남았는지 표기
        { val: 'C04', txt: '마감' }, //이벤트 마감 날짜를 지나 버렸기에 D-day 만 표기
        { val: 'C05', txt: '추첨완료' },  //이벤트 추첨도 끝났기에 D-day 만 표기
        { val: 'C06', txt: '종료' }, // 아무것도 표기 안함.
        */
        const { startDateAt, endDateAt, startTimeAt, endTimeAt }=period;
        //startTimeAt test
        // const startDate=`${ startDateAt } ${ startTimeAt }`;
        // const endDate=`${ endDateAt } ${ endTimeAt }`;
        // console.log( startDate, endDate );



        const startDate=dayjs(`${ startDateAt } ${ startTimeAt }`);
        const endDate=dayjs(`${ endDateAt } ${ endTimeAt }`);
        //dayjs
        // const fromDate=dayjs( startDate ).fromNow();
        let resultDate: string='';
        //일자와 시간 모두 존재할 때 ( 보통 일반 이벤트 )
        if (status === 'C01') {// 진행예정
            const fromDate=dayjs( Date.now() ).diff(startDate, 'd');
            // resultDate=`시작까지:D-${Utils.dDayToCount( new Date( startDate ), 'next' )[0]}`;
            resultDate=`시작까지:D-${fromDate}`;
        }else if(status ==='C02'){// 진행중
            const fromDate=dayjs( endDate ).diff(Date.now(), 'd');
            // resultDate=`종료까지:D-${Utils.dDayToCount( new Date( endDate ),'next'  )[0]}`;
            resultDate=`종료까지:D-${fromDate}`;
        }else if(status ==='C03'){//마감일( 당일 )
            const targetTimes=this.getDiffTimes( endDate );
            // const endTime=Utils.dDayToCount( new Date( endDate ), 'next');
            // const targetTime=Utils.getTimeColonFormat( endTime[1], endTime[2] );
            // const targetTime=dayjs( endDate ).diff(Date.now(), 'hh:mm');
            resultDate=`D-day (-${targetTimes})`;
            // console.log( Utils.dDayToCount( new Date( endDate), 'next') );
        }else{
            resultDate='D-day';
        }
        return resultDate;
    }

    public getLiveEventCountDayView(status: string, period:{ startTimeAt: string | Date, endTimeAt: string | Date, startDateAt?:string | Date, endDateAt?: string | Date } ) {
        /*
               { val: 'C01', txt: '진행예정' },  //이벤트 날짜( startDateAt )로 부터 오늘 기준으로 앞으로 몇일 + 로 남았는지 표기
               { val: 'C02', txt: '진행중' }, //오늘로부터 이벤트 날짜 ( endDateAt ) 기준으로 몇일 남았는지
               { val: 'C03', txt: '마감일' },  // ''표기
               { val: 'C04', txt: '마감' }, //''표기
               { val: 'C05', txt: '추첨완료' },  //''표기
               { val: 'C06', txt: '종료' }, // ''표기
               */
        const { startDateAt, endDateAt, startTimeAt, endTimeAt }=period;
        const todayItem=Utils.getCustomFormatDate( new Date(), '-' );

        //startTimeAt test
        const startDate=(startDateAt)? dayjs(`${ startDateAt } ${ startTimeAt }`) : dayjs(`${todayItem} ${ startTimeAt }`);
        const endDate=(endDateAt)? dayjs(`${ endDateAt } ${ endTimeAt }`) : dayjs(`${todayItem} ${ endTimeAt }`);

        let resultDate: string='';
        //시간만 존재하는 경우
        /*if (status === 'C01') {// 진행예정 ( 현시점보다는 무조건 앞날의 시간이여야 한다 )
            const msOfDay=24 * 60 * 60 * 1000;
            const calcDate=( new Date( startDate ).getTime() - new Date(todayItem).getTime() );
            const calcDay=Math.floor( calcDate / msOfDay );
            const targetTime=Utils.dDayToCount( new Date( startDate ), 'next' );
            // console.log( 'calcDay=', calcDay );
            if (calcDay > 1) {
                resultDate=`시작까지:D-${targetTime[0]}`;
            }else{
                resultDate=`시작까지:-${targetTime[1]}:${targetTime[2]}`;
            }
        }else if(status ==='C02'){// 진행중
            const endTime=Utils.dDayToCount( new Date( endDate ),'next'  );
            const convertToTime=Utils.getTimeColonFormat( endTime[1], endTime[2] );
            resultDate=`${convertToTime}`;
        }*/
        if (status === 'C01') {// 진행예정 ( 현시점보다는 무조건 앞날의 시간이여야 한다 )
            const calcDay=dayjs( startDate ).diff(Date.now(), 'd');
            const calcHour=dayjs( startDate ).diff(Date.now(), 'h');
            // console.log( calcDay, calcHour );
            if (calcHour > 24) {
                resultDate=`시작까지:D-${calcDay}`;
            }else{
                const targetTimes=this.getDiffTimes( endDate );
                resultDate=`시작까지:-${targetTimes}`;
            }
        }else if(status ==='C02'){// 진행중
            const targetTimes=this.getDiffTimes( endDate );
            resultDate=`종료까지:-${targetTimes}`;
        }
        return resultDate;
    }

}

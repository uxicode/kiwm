<template>
<!--
<time-picker
          id="startTimePicker" // timerpicker id
          size="246px" // width 사이즈
          :hour-increment="1"  //증가감 시간 단위
          :minute-increment="5"  //증가감 분 단위
          :min-time="5" // 최소시간대( 단위:분 ) 설정. (min-time="5" 로 설정시 현재 시간대에서 5분을 더한값. 즉 현재 시각이 11:05 이라면 11:10 이전 시간대는 선택할 수 없겠끔 한다 )
          placeholder="06:30"  //placeholder  // Utils.getTimeColonFormat( new Date().getHours(), new Date().getMinutes() ); util 함수를 쓰면 됨  즉 오늘 날짜의 시간을 placeholder 에 입력하기 위함.
          :model-init-by-disabled="false"     // disabled 하게 될때 값도 초기화 할지 여부 / true 하면 지정한 날짜 초기화
          :disabled="selectedBenefitsValue!=='PO'" // disabled 값 ( true / false )
           @change="onEndDateChange">   // 지정한 시간값을 전달한다.
          ></time-picker>
-->

  <div class="input-set">
    <input type="text"
           class="form-control cal"
           autocomplete="off"
           v-model="timeModel"
           :id="id"
           :style="{width: size}"
           :placeholder="placeholder"
           :disabled="isDisabled"
           @change="onDateChange($event.target.value)">
    <button class="ico-btn" type="button"><i class="icon-clock"></i></button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import Btn from '@/components/common/button/Btn.vue';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
// type modeType='single' | 'range' | undefined;

@Component({
  components:{
    Btn
  }
})
export default class TimePicker extends Vue{

  @Prop(String)
  private id!: string;

  @Prop(String)
  private size: string | undefined;

  @Prop(String)
  private placeholder: string | undefined;

  @Prop(String)
  private initValue: string | undefined;

  @Prop(String)
  private defaultDate: string | undefined;

  @Prop(Number)
  private hourIncrement: number | undefined;

  @Prop(Number)
  private minuteIncrement: number | undefined;

  @Prop(Boolean)
  private disabled: boolean | undefined;

  @Prop(Number)
  private minHour: number | undefined;

  @Prop(Number)
  private minMinute: number | undefined;

  @Prop(Boolean)
  private modelInitByDisabled: boolean | undefined;

  private timeModel: string='';
  private dateValue: string[] | Date[]=[];
  private picker!: any;

  get isDisabled() {
    // console.log( this.disabled );
    return this.disabled;
  }

  public created() {
    if (this.modelInitByDisabled && this.disabled) {
      this.timeModel='';
    }

    this.timeModel = (this.initValue!==undefined)? this.initValue : '';
  }

  public mounted() {
    const sTimePicker=document.querySelector( '#'+this.id ) as HTMLInputElement;

    let today=dayjs( new Date() );
    if (this.minHour !== undefined && this.minMinute !== undefined) {
      // console.log('this.minHour=', this.minHour, this.minMinute );
      today=today.hour(Number(this.minHour) );
      today=today.minute(Number(this.minMinute) );
    }


    const minTimeOption: any=(this.minHour!==undefined && this.minMinute!==undefined) ? { minTime: today.format('HH:mm')  } : {};
    const initTime=(this.initValue!==undefined)? this.initValue : '';
    let pickerOption: any={
      allowInput:true, // readonly 제거
      enableTime: true,  // timepicker 전용
      noCalendar: true, // date picker 안보임 처리
      dateFormat: 'H:i',
      defaultDate: initTime,
      time_24hr: true,  // 24 시간 타입
      hourIncrement: this.hourIncrement || 1,  // 시간 간격 설정
      minuteIncrement: this.minuteIncrement || 5,  // 분 간격 설정.
      onReady:()=>{
        // this.dateModel=(this.initValue)? this.initValue : '';
      },
      onChange: ( date: any )=>{
        // console.log( date, this.minHour, this.minMinute );
        this.dateValue=date;
        if (this.minHour && this.minMinute) {
          today=today.hour(Number(this.minHour) );
          today=today.minute(Number(this.minMinute) );
          this.picker.set( 'minTime', today.format( 'HH:mm' ) );
        }

      }
    };
    pickerOption={ ...pickerOption, ...minTimeOption };
    // console.log( )
    this.picker=flatpickr( sTimePicker, pickerOption);
    /*this.picker=flatpickr( sTimePicker, {
      allowInput:true, // readonly 제거
      enableTime: true,  // timepicker 전용
      noCalendar: true, // date picker 안보임 처리
      dateFormat: 'H:i',
      hourIncrement: this.hourIncrement || 1,  // 시간 간격 설정
      minuteIncrement: this.minuteIncrement || 5,  // 분 간격 설정.
      // defaultDate: this.defaultDate || '18:30', // 처음 시작 시간
      // minTime: '18:00', // 최소 시간
      // maxTime: '19:30', //최대 시간
      onReady: (selectedDates, dateStr, instance)=>{
        // console.log( selectedDates, dateStr, instance );
        // $(instance.altInput).prop('readonly', false);
      },
    } );*/
    // this.picker.set( 'mode', this.mode );
  }

  public clear() {
    this.picker.clear();
  }

  @Emit()
  private onDateChange(value: string) {
    // console.log( value );
    this.$emit( 'change', value );
  }
}
</script>

<style scoped>

</style>

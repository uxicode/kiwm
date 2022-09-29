<template>
<!--
 <date-picker
      mode="single"   // 캘린더 타입 ( single / range )
      id="endDatePicker"  // 캘린더 id
      size="246px"   // 캘린더 width
      :min-date="1" // 최소 시작일 (단위:일수 )  ( min-date="1" 로 설정시 오늘 일수에서 1일을 더한값 즉, 오늘이 2월10일 이라면 2월11일 이전 날짜는 선택할 수 없겠끔 한다 )
      :placeholder="getDate()"   // Utils.getCustomFormatDate( new Date(), '-' ) util 함수를 쓰면 됨  즉 오늘 날짜를 placeholder 에 입력하기 위함.
      :model-init-by-disabled="false"     // disabled 하게 될때 값도 초기화 할지 여부 / true 하면 지정한 날짜 초기화
      :disabled="selectedBenefitsValue!=='PO'" // disabled 값 ( true / false )
      @change="onEndDateChange">   // mode 가  single 일 경우는 지정한 날짜 값 반환 /  range 일경우 시작/종료 범위 두개값을 가진 배열로 값을 전달한다.
      </date-picker>
 -->

  <div class="input-set">
    <input type="text"
           class="form-control cal flatpickr"
           autocomplete="off"
           v-model="dateModel"
           :id="id"
           :placeholder="placeholder"
           :style="{width: size}"
           :disabled="disabled"
           @input="onDateChange($event.target.value)">
    <button class="ico-btn" type="button"><i class="icon-calendar"></i></button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import Btn from '@/components/common/button/Btn.vue';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

type modeType='single' | 'range' | undefined;

@Component({
  components:{
    Btn
  }
})
export default class DatePicker extends Vue{

  @Prop(String)
  private mode: modeType;

  @Prop(String)
  private id!: string;

  @Prop(String)
  private initValue: string | undefined;

  @Prop(String)
  private size: string | undefined;

  @Prop(String)
  private placeholder: string | undefined;

  @Prop(Boolean)
  private disabled: boolean | undefined;

  @Prop(Boolean)
  private modelInitByDisabled: boolean | undefined;

  @Prop([Number, String])
  private minDate: number | string |undefined;

  @Prop([Number, String])
  private maxDate: number | string |undefined;

  private dateModel: string = '';
  private dateValue: string[] | Date[]=[];
  private picker!: any;

  get isDisabled() {
    return this.disabled;
  }

  public created() {
    if (this.modelInitByDisabled && this.disabled) {
      this.dateModel='';
    }
    // console.log( this.disabled );
    this.dateModel = (this.initValue!==undefined)? this.initValue : '';
  }


  public mounted() {

    // console.log('this.dateModel =', this.initValue);
    const datePickerInput=document.querySelector( '#'+this.id ) as HTMLInputElement;
    //최소 시작 날짜 - 오늘을 기점으로 enable 할 수 있는 날 지정.
   /* let today=dayjs( new Date() );
    today=today.day(today.get('d')+Number(this.minDate) );
*/
    const minDateOption: any=(this.minDate !== undefined) ? { minDate: dayjs(this.minDate).format( 'YYYY-MM-DD') } : {};
    const maxDateOption: any=(this.maxDate !== undefined) ? { maxDate: dayjs(this.maxDate).format( 'YYYY-MM-DD') } : {};
    let pickerOption: any={
      allowInput:true,
      mode:this.mode,
      dateFormat: 'Y-m-d',
      onReady:()=>{
        // this.dateModel=(this.initValue)? this.initValue : '';
      },
      onChange: ( date: any )=>{
        this.dateValue=date;
        if (this.minDate) {
          this.picker.set( 'minDate', dayjs(this.minDate).format( 'YYYY-MM-DD') );
        }

        if (this.maxDate) {
          this.picker.set( 'maxDate', dayjs(this.maxDate).format( 'YYYY-MM-DD') );
        }
      }
    };
    pickerOption={ ...pickerOption, ...minDateOption, ...maxDateOption };
    // console.log( )
    this.picker=flatpickr( datePickerInput, pickerOption);
    // this.picker.setDate(this);
  }

  public clear() {
    this.picker.clear();
  }

  public setDate(setDateInfo: string[], trigger: boolean, format: string) {
    this.picker.setDate( setDateInfo, trigger, format );
  }

  @Emit()
  private onDateChange(value: string) {
    // console.log( value );
    // mode 가 range 일경우 시작/종료 범위 두개값을 가진 배열로 값을 전달한다.
    this.$emit( 'change', (this.mode==='single')? value : this.dateValue );
  }

}
</script>

<style scoped>

</style>

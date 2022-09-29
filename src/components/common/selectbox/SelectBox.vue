<template>
  <!--
  <select-box
  tit="접근성을 위한 타이틀"
  id="startYear"
  size="select 의 width 값 - px 없이 값만 전달하면 됨"
  :items="option 태그의 값"
  @change="updateYears-값 change 함수- emit 함수"
  :selected-value="적용할 옵션값 - change emit 이벤트를 통해 부모에서 변경된 변수"></select-box>-->
  <select class="form-select"
           :title="tit"
          :style="{width:width}"
          :value="selectedValue"
          :id="id"
          :class="[addClass, getSize()]"
          :disabled="disabled"
          @change="updateValue($event.target.value)">
    <option v-for="(item, index) in items" :value="item[val]" :key="`opt-${index}`">{{ item[txt] }}</option>
  </select>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import { Utils } from '@/utils/utils';

@Component
export default class SelectBox extends Vue {

  @Prop(Array)
  private readonly items: Array<{ [key: string]: string | boolean }> | undefined;

  @Prop(String)
  private readonly val: string | undefined;

  @Prop(String)
  private readonly txt: string | undefined;

  @Prop(Number)
  private readonly seq: number | undefined;

  @Prop(String)
  private readonly tit: string | undefined;

  @Prop(String)
  private readonly id: string | undefined;

  @Prop(String)
  private width: string | undefined;

  @Prop(String)
  private size: string | undefined;

  @Prop(String)
  private addClass!: string;

  @Prop(Boolean)
  private disabled: boolean | undefined;

  @Prop([String, Number, Boolean])
  private readonly selectedValue!: string | number | boolean;

  public created() {
    // console.log( '선택된 필터 text=', this.selectedValue );
  }

  public getSize(): string {
    let selectSize: string='';
    if (this.size!==undefined) {
      selectSize=`form-select-${this.size}`;
    }
    return selectSize;
  }

  private updateValue ( value: string | number | boolean ): void {
    // console.log(Utils.getType( value ), Utils.getType(100), Utils.getType('true'), Utils.getType(false), Utils.getType('C01'), Utils.getType( ()=>{return 1;}) );
    if (Utils.getType( value ) === 'boolean' || Utils.getType( value ) === true || Utils.getType( value ) === false) {
      // console.log( Utils.getType( value ), typeof Utils.getType( value ) );
      this.$emit('change', Utils.getType( value ) );
    }else if( Utils.getType( value ) ==='string'){
      this.$emit('change', value as string);
    }else if (Utils.getType( value ) === 'number') {
      if (this.seq !== undefined) {
        this.$emit('change', value as number, this.seq );
      }else{
        this.$emit('change', value as number );
      }

    }else{
      throw new Error('select box error / 함수 updateValue 인자타입 오류');
    }
  }
}
</script>

<style scoped>

</style>

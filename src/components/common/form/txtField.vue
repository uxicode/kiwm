<template>
  <!--
  <txt-field input-type="input type / 해당 옵션없을시 default 값은 text"
              size="input width /단위(px) 해당 옵션없을시 default 값은 100%"
              add-class="input 태그에 추가할 css class //해당 옵션없을시 default 값은 공백처리"
              label="label 태그 text"
              id="input 아이디"
              placeholder="placeholder 내용"
              comment="input 아래 밑첨자로 추가 설명 텍스트"
              v-model="input model"
              rules="vee-validation 의 filter 함수"
              valid-name="vee-validation 의 ValidationProvider 태그의 아이디 - 에러 문구 호출시 해당 태그의 아이디를 참조한다."></txt-field>
  -->
  <div class="txt-field-container" :style="{width:size || 'auto'}">
    <template v-if="rules!==undefined">
      <ValidationProvider :name="validName" :rules="rules" v-slot="{ errors, passed, failed }">
        <label :for="id" v-if="isLabel" :class="labelAddClass">{{ label }}</label>
        <input class="form-control"
               :class="[cssClassName, errorClassCheck( errors[0] ) ]"
               :id="id"
               :type="inputFieldType"
               :placeholder="placeholder"
               :value="inputData"
               :maxlength="maxLen"
               :disabled="disabled"
               :readonly="isReadOnly"
               :style="{width: inputSize || '100% !important;'}"
               @input="inputChange(  $event.target.value )"
               @keyup="resultValidate( $event.target, passed )"
               @keyup.enter="onKeyEnter" />
        <slot name="addTag" v-if="isExist"></slot>
        <template v-if="failed">
          <p class="form-message error">{{ errors[0] }}</p>
        </template>
        <template v-else>
          <p class="form-message" v-if="comment!==undefined">{{comment}}</p>
          <p class="form-message approval" v-if="success">{{ successFeedback }}</p>
          <p class="form-message error" v-if="fail">{{ failFeedback }}</p>
        </template>
      </ValidationProvider>
    </template>
    <template v-else>
      <label :for="id" v-if="isLabel" :class="labelAddClass">{{ label }}</label>
      <input class="form-control"
             :class="cssClassName"
             :value="inputData"
             :id="id"
             :type="inputFieldType"
             :placeholder="placeholder"
             :maxlength="maxLen"
             :disabled="disabled"
             :readonly="isReadOnly"
             :style="{width: inputSize || '100% !important;'}"
             @input="inputChange(  $event.target.value )"
             @keyup.enter="onKeyEnter">
      <slot name="addTag" v-if="isExist"></slot>
    </template>
  </div>
</template>

<script lang="ts">

import {Vue, Component, Prop, Model, Emit} from 'vue-property-decorator';

@Component
export default class TxtField extends Vue{

  @Model('input') public inputData!: string;

  @Prop(String)
  private readonly validName: string | undefined;

  @Prop(Function)
  private keyEnter!: () => void | undefined | null;

  @Prop(String)
  private readonly addClass: string | undefined;

  @Prop(String)
  private readonly id: string | undefined;

  @Prop(Number)
  private readonly seq: number | undefined;

  @Prop(String)
  private inputType: string | undefined;

  @Prop(String)
  private rules: string | undefined;

  @Prop(String)
  private size: string | undefined;

  @Prop(String)
  private inputSize: string | undefined;

  @Prop(String)
  private placeholder: string | undefined;

  @Prop(String)
  private labelAddClass: string | undefined; // 'form-label', 'col-form-label'

  @Prop(String)
  private label: string | undefined;

  @Prop(String)
  private successFeedback: string | undefined;

  @Prop(String)
  private failFeedback: string | undefined;

  @Prop(Boolean)
  private success!: boolean;

  @Prop(Boolean)
  private fail!: boolean;

  @Prop(String)
  private comment: string | undefined;

  @Prop(Boolean)
  private isReadOnly: boolean | undefined;

  @Prop(Boolean)
  private disabled!: boolean;

  @Prop([String, Number])
  private maxLen!: string | number | undefined;


  // private inputData: string='';
  get isExist() {
    return !!this.$slots.addTag;
  }

  get cssClassName(): string{
    return (this.addClass !== undefined)? this.addClass : '';
  }

  get isSuccess(): boolean{
    return this.success;
  }


  get isLabel(): boolean {
    return this.label!==undefined;
  }

  get inputFieldType(): string {
    return this.inputType===undefined? 'text' : this.inputType;
  }

  public onKeyEnter() {
    // this.keyEnter.call(this);
    if( this.keyEnter ){
      this.keyEnter();
    }
  }

  public errorClassCheck(value: unknown): string {
    // console.log( value )
    return value === undefined ? '' : 'error';
  }

  /**
   * mounted - 화면 렌더링 후
   */
  public mounted(): void{
    // console.log( this.$el.parentElement.classList.contains('inline') );
    //타입 지정 안해주면 Object is possibly null 에러 난다.
    const parentElement = this.$el.parentElement as HTMLElement;
    const parentClassList = parentElement.classList;
    //바로 위에 부모 노드에서 inline className 이 존재한다면 inline 클래스를 추가.
    if( parentClassList.contains('inline') ){
      this.$el.classList.add('inline');
    }
  }

  @Emit()
  private inputChange( value: string | number ){
    // this.inputData=value;
    if (this.seq !== undefined) {
      this.$emit('input', value , this.seq );
    }else{
      this.$emit('input', value );
    }

  }

  private resultValidate( ele: HTMLInputElement , passed: boolean ): void{
    //validate 에 대한 rules 가 없을 때 여기서 종료시킴.
    if( this.rules === undefined ){ return; }

    if( passed ){
      if( ele.classList.contains('error') ){
        ele.classList.remove('error');
      }
    }
    this.$emit('change', passed);
  }

}
</script>

<style lang="scss" scoped>
.txt-field-container{
  &.inline{
    display: inline-block;
    vertical-align: top;
  }
}
</style>

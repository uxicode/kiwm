<template>

  <!-- ex)
  <radio-button btn-id="radio2"
                        radio-name="radio"
                        btn-value="email"
                        :active-value="formData.radioValue" // 처음
                        v-model="formData.radioValue"
                        @click="optionFindChange">회원 정보에 등록된 이메일로 인증</radio-button>
    -->

  <div class="form-radio" :class="addClass">
    <input type="radio"
           class="form-check-input"
           :name="radioName"
           :id="btnId"
           :value="btnValue"
           :checked="checkedState"
           @change="update( $event.target.value, $event.target.checked )">
    <label :for="btnId" class="form-check-label">
      <slot></slot>
    </label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class RadioButton extends Vue {
  @Prop(String)
  public addClass: string | undefined;

  @Prop(String)
  public btnId!: string;

  @Prop(String)
  public radioName!: string;

  @Prop(String)
  public label!: string;

  @Prop([String, Number, Boolean])
  public btnValue!: string | number | boolean;

  @Prop([String, Number, Boolean])
  public activeValue!: string | number | boolean;

  get checkedState() {
    return this.btnValue === this.currentValue;
  }

  private currentValue: string | number | boolean = '';
  private checked: boolean=true;


  @Emit()
  public update( value: string | number | boolean, checked: boolean ) {
    this.currentValue = value;
    this.checked=checked;
    // this.btnValue=value;
    this.$emit('click', this.currentValue, this.checked );
  }

  public mounted(): void{
    this.currentValue=this.activeValue;
    // console.log(this.btnValue, 'currentValue='+this.currentValue, this.btnValue === this.currentValue);
  }



}
</script>

<style scoped>

</style>

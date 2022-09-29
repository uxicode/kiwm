<template>
  <!--
  설명
   <check-button :btn-id="체크박스 아이디"
                      :check-name="체크박스 네임"
                      :btn-value="체크박스 value"
                      :checked="현재 check 된 상태 boolean 값"
                      :disabled="disabled 변수"
                      @click="클릭시 실행할 함수">라벨 텍스트</check-button>

  ex)

 public allCheckValue: string = 'all';
private allChecked: boolean = true;

<check-button :btn-id="`check${gift.idx}`"
                          :check-name="`check${gift.idx}`"
                          :btn-value="gift.val"
                          :checked="gift.isChecked"
                          :disabled="gift.isDisabled"
                          @click="updateCheck">{{ gift.tit }}</check-button>

  -->
  <div class="form-check" :class="addClass">
    <input type="checkbox"
           class="form-check-input"
           :name="checkName"
           :id="btnId"
           :value="btnValue"
           :checked="checked"
           :disabled="isDisabled"
           @change="update( $event.target.value, $event.target.checked )">
    <label :for="btnId" class="form-check-label"><slot></slot></label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class CheckButton extends Vue {

  @Prop(Boolean)
  public readonly isDisabled: boolean | undefined;

  @Prop(String)
  public readonly addClass: string | undefined;

  @Prop(String)
  public readonly  checkName: string | undefined;

  @Prop(String)
  public readonly  btnId: string | undefined;

  @Prop(Number)
  private readonly seq: number | undefined;

  @Prop(Boolean)
  public readonly  isLabel: boolean | undefined;

  @Prop(String)
  public readonly  label!: string;

  @Prop([Boolean, String, Number])
  public readonly btnValue!: string | boolean | number;

  @Prop(Boolean)
  public readonly checked: boolean | undefined;


  private update ( value: string | number | boolean, checked: boolean ): void {
    if (this.seq !== undefined) {
      this.$emit('click', value, checked, this.seq );
    }else{
      this.$emit('click', value, checked );
    }

  }
}
</script>

<style scoped>
.form-check.label-none{padding-left:7px;}
.form-check.label-none input{margin:0;float:none;}
</style>

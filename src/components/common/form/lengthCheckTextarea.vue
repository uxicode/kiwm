<!--
<textarea v-model="answerContent"
          class="form-control"
          placeholder="답변 내용을 입력해 주세요."
          style="width: 552px;"></textarea>
-->
<template>
  <div class="d-inline-block">
    <div class="form-group" :style="{width:size}">
      <textarea class="form-control"
                :class="cssClassName"
                :value="inputData"
                :id="id"
                :rows="rows"
                :cols="cols"
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="max"
                @input="inputChange(  $event.target.value )"></textarea>
    </div>
    <p class="hint">
      <!--      * 500자 이내-->
      <span v-if="comment!==undefined">{{ comment }}</span>
      <span class="float-rt"><strong class="num">{{ ingTxt }}</strong>/{{ max }}</span>
    </p>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';

@Component
export default class LengthCheckTextarea extends Vue {

  @Model( 'input' ) public inputData!: string;

  @Prop( Function )
  private keyEnter!: ()=>void | undefined | null;

  @Prop( String )
  private readonly addClass: string | undefined;

  @Prop( String )
  private readonly id: string | undefined;

  @Prop( String )
  private size: string | undefined;

  @Prop( String )
  private placeholder: string | undefined;

  @Prop( String )
  private comment: string | undefined;

  @Prop( String )
  private inputType: string | undefined;

  @Prop( Number )
  private max: number | undefined;

  @Prop( [Number, String])
  private rows: number | string | undefined;

  @Prop( [Number, String])
  private cols: number | string | undefined;

  private txtLen: number=0;

  @Prop( Boolean )
  private disabled!: boolean;

  get ingTxt() {
    return (this.inputData) ? this.inputData.length : this.txtLen;
  }

  get cssClassName(): string {
    return (this.addClass !== undefined) ? this.addClass : '';
  }

  public onKeyEnter() {
    // this.keyEnter.call(this);
    if (this.keyEnter) {
      this.keyEnter();
    }
  }

  @Emit()
  private inputChange(value: string) {
    // this.inputData=value;
    this.txtLen=value.length;
    // const text=value.replace( /^\s+|\s+$/, '' );
    this.$emit( 'input', value );
  }

}
</script>

<style scoped>

</style>

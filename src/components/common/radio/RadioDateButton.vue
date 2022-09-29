<template>
  <div class="btn-group mgb-2" :class="addClass">
    <template v-for="(item, index) in items">
      <input type="radio"
             class="btn-check"
             name="radio"
             autocomplete="off"
             :id="`radioBtn-${index}`"
             :value="item[val]"
             :checked="item[val]===currentValue"
             :key="`btn-${index}`"
             @click="update( $event.target.value, $event.target.checked )">
      <label class="btn btn-outline-desc"
             :for="`radioBtn-${index}`"
             :key="`btnLabel-${index}`">{{item[txt]}}</label>
    </template>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component
export default class RadioDateButton extends Vue {

  @Prop(Array)
  private readonly items: Array<{ [key: string]: string }> | undefined;

  @Prop(String)
  private readonly addClass: string | undefined;

  @Prop(String)
  private readonly val: string | undefined;

  @Prop(String)
  private readonly txt: string | undefined;

  @Prop(String)
  private radioName!: string;

  @Prop(String)
  private label!: string;

  @Prop([String, Number, Boolean])
  private activeValue!: string | number | boolean;

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
  }

}
</script>

<style scoped>

</style>

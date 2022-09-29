<template>
  <div class="card" :class="addClass">
    <div class="card-header" v-if="isExistHeader">
      <slot name="header"></slot>
    </div>
    <div class="card-body" :class="bodyAddClass">
      <slot name="body"></slot>
    </div>
    <div class="card-footer" v-if="isExistFooter" :class="footerAddClass">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class CardView extends Vue{

  @Prop(String)
  public readonly addClass: string | undefined;

  @Prop(String)
  public readonly bodyAddClass: string | undefined;

  @Prop(String)
  public readonly footerAddClass: string | undefined;

  get isExistHeader() {
    return !!this.$slots.header;
  }

  get isExistFooter() {
    return !!this.$slots.footer;
  }

}
</script>


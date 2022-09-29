<template>
  <!-- example
<modal v-if="showModal" @close="showModal = false">
  <h3 slot="header">custom header</h3>
  <div slot="body"> default body </div>
  <div slot="footer"> default body </div>
</modal>
-->
  <div class="modal" style="display: block">
    <div class="modal-dim" @click.capture="onCloseClick"></div>
    <div class="modal-dialog modal-dialog-centered" :style="{ width: size || 'auto'}">
      <div class="modal-content">
        <!-- popup header -->
        <div class="modal-header" :style="{'background-color':getBackgroundColor()}" :class="[headerAddClass]">
          <slot name="header"></slot>
        </div>
        <!--// popup header -->

        <!-- popup body -->
        <div class="modal-body" :style="{padding: bodyPadding }">
          <slot name="body"></slot>
        </div>
        <!--// popup body -->

        <!-- popup footer -->
        <div class="modal-footer" :style="{padding: footerPadding }" :class="footerAddClass" v-if="isExistFooter">
          <slot name="footer"></slot>
        </div>
        <!--// popup footer -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Modal extends Vue {

  @Prop(Boolean)
  private readonly isHeader: boolean | undefined;

  @Prop(String)
  private readonly size: string | undefined;

  @Prop(String)
  private readonly headerAddClass: string | undefined;

  @Prop(String)
  private readonly bodyPadding: string | undefined;

  @Prop(String)
  private readonly footerPadding: string | undefined;

  @Prop(String)
  private readonly footerAddClass: string | undefined;

  get isExistFooter() {
    return !!this.$slots.footer;
  }

  public getBackgroundColor(): string {
    // console.log( this.isHeader );
    if (this.isHeader !== undefined) {
      if (this.isHeader) {
        return '';
      }else{
        return 'transparent';
      }
    }else{
      return '';
    }

  }

  public getHeader() {
    if (this.isHeader !== undefined) {
      if (!this.isHeader) {
        return 'pdt-0';
      }
    }else{
      return '';
    }
  }

  public onCloseClick(): void{
    // console.log('클릭');
    this.$emit('close');
  }
}
</script>

<style lang="scss" scoped>

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

/*.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .popup-dialog,
.modal-leave-active .popup-dialog {
  transform: translate(-50%, -50%) scale(0.3);
}*/
</style>

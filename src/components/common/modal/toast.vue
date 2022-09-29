<template>
  <div class="popup">
    <div class="modal-dim" @click.self="close"></div>
    <div class="modal-dialog modal-dialog-centered">
      <div class="toast basic-toast fade show" :style="{ width: size || '400px'}">
        <div class="toast-header">
          <img :src="require('@/assets/images/common/logo.png')" class="me-1" alt="" height="18" width="25">
          <strong class="me-auto">{{ title }}</strong>
          <small class="text-muted">{{ time }}</small>
          <button type="button" class="ms-1 btn-close" @click="close"></button>
        </div>
        <div class="toast-body" :style="{padding: bodyPadding}">{{ msg }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Toast extends Vue {
  @Prop(String)
  private size!: string;

  @Prop(String)
  private title!: string;

  @Prop(String)
  private time!: string;

  @Prop(String)
  private msg!: string;

  @Prop(String)
  private bodyPadding!: string;

  public close(): void {
    // console.log('클릭');
    this.$emit('toastClose');
  }
}

</script>

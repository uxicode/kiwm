<template>
  <transition name="modal">
    <modal v-if="isOpen"
           :is-header="false"
           header-add-class="pdb-0"
           footer-add-class="text-center border-top-0"
           footer-padding="30px 20px"
           @close="popupChange(false)">
      <template slot="header">
        <button  type="button" class="btn-close" @click="popupChange(false)"></button>
      </template>
      <template slot="body"><p class="text-center" v-html="$options.filters.n2br(msg)" ></p></template>
      <template slot="footer">
        <btn type="outline" size="md" @click="updateConfirm(false)">취소</btn>
        <btn size="md" :color="isDeleteBtn!==undefined && isDeleteBtn? 'danger': 'primary'" @click="updateConfirm(true)">확인</btn>
      </template>
    </modal>
  </transition>
</template>
<script lang="ts">
import {Vue, Component, Prop } from 'vue-property-decorator';
import Modal from './modal.vue';
import Btn from '../button/Btn.vue';

@Component({
  components: {
    Modal,
    Btn
  }
})
export default class ConfirmPopup extends Vue {
  @Prop(Boolean)
  private readonly isOpen: boolean | undefined;

  @Prop(String)
  private readonly title: string | undefined;

  @Prop(String)
  private readonly msg: string | undefined;

  @Prop(Boolean)
  private readonly isDeleteBtn: boolean | undefined;

  private updateConfirm ( result: boolean ) {
    this.popupChange(false);
    this.$emit('confirm', result );
  }

  private popupChange ( value: boolean ) {
    this.$emit('change', value);
  }

}
</script>

<style scoped>

</style>

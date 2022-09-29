<template>
  <div class="contents">
    <div class="content-header" v-if="isExistHeader">
      <div class="content-header-left col-12 mb-2" >
        <slot name="header"></slot>
      </div>
    </div>
    <div class="content-body" v-if="isExistBody">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class ContentsContainer extends Vue{
  get isExistHeader() {
    return !!this.$slots.header;
  }

  get isExistBody() {
    return !!this.$slots.body;
  }
}
</script>


<template>
  <div class="filter-group d-inline-flex" style="height:38px;">
    <span class="tit">{{ (title!==undefined)? title : '선택된 필터' }}</span>
    <transition name="trans-list">
      <p class="none-comment trans-list" v-show="items.length<=0">없음</p>
    </transition>
    <transition-group name="trans-list" tag="span">
         <span class="filter-tag trans-list"
               v-show="items.length>0"
               v-for="(item, index) in items"
               :class="{'mgl-12':index!==0}"
               :key="`hashBtn-${index}`">{{ item }}
           <button type="button" @click="onBtnClick(item)"><i class="icon-x1"></i></button>
         </span>
    </transition-group>
  
  </div>
</template>

<script lang="ts">

import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class HashTagBtn extends Vue{
  @Prop(String)
  public readonly title: string | undefined;

  @Prop(Array)
  public readonly items: string[] | undefined;

  public onBtnClick( value: string ) {
    this.$emit( 'click', value );
  }
}
</script>

<style scoped>
.none-comment{
  font-size:12px;
  line-height:38px;
  margin-left:-15px;
}
</style>

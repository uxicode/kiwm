<template>
  <a href="javascript:void(0);"  :class="{'aside-main-tit':isTitle}">
    <i :class="icon"></i>
    <span class="aside-tit">{{ txt }}</span>
    <span class="more-btn" v-if="isChildren!==undefined && isChildren"><i class="icon-chevron-right float-rt mgr-0"></i></span>
  </a>
<!--  2depth 
<a href="#" @click.prevent="onClick( mIdx, sIdx)" :class="{'aside-main-tit':mIdx===0 && sIdx===0}">
  <i :class="sItem.icon"></i>
  <span class="aside-tit">{{ sItem.txt }}</span>
  <span class="more-btn" v-if="sItem.children!==undefined"><i class="icon-chevron-right float-rt mgr-0"></i></span>
</a>
-->
<!-- 3depth 
<a href="#" @click.prevent="onClick( mIdx, sIdx, lsIdx)">
    <i :class="lsItem.icon"></i>
    <span class="aside-tit">{{ lsItem.txt }}</span>
</a>-->
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IMenu } from '@/model/sidebar/ISideMenu';


@Component
export default class MenuItem extends Vue {
  
  @Prop(Array)
  readonly items!: IMenu[] | IMenu[][];
  
  @Prop(Boolean)
  readonly isChildren: boolean | undefined;
  
  @Prop(Boolean)
  readonly isTitle: boolean | undefined;
  
  @Prop( String ) 
  readonly txt!: string;
  
  @Prop( String )
  readonly icon!: string;
  
}
</script>


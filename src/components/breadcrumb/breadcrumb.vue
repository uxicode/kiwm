<template>
  <div class="d-flex d-inline-flex">
    <h2 class="content-header-title" v-if="title!==undefined">{{ title }}</h2>
    <div class="breadcrumb-wrapper">
      <ol class="breadcrumb" :class="`breadcrumb-${type}`">
        <li class="breadcrumb-item"
            v-for="(item, idx) in items" :key="`item-${idx}`"
            :class="{'active': idx===items.length-1}">
          <a href="javascript:void(0);" style="cursor:default" @click.prevent="getAbleLink($event, idx)">{{ item }}</a>
        </li>
      </ol>
    </div>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class BreadCrumb extends Vue {

  @Prop(String)
  private readonly type!: string; // 'slash', 'dots', 'dashes', 'pipes', 'chevron'

  @Prop(String)
  private readonly title: string | undefined;

  @Prop(Array)
  private items!: string[];

  @Prop( Array )
  private links: string[] | undefined;

  public getCursor( idx: number ) {
    if (idx === this.items.length - 1) {
      return 'default';
    }else{
      return 'pointer';
    }
  }

  public getLink( idx: number ) {
    if (this.links === undefined) {
      return 'javascript:void(0)';
    }else{
      if( idx !== this.items.length - 1){
        return this.links[idx];
      }else{
        return 'javascript:void(0)';
      }
    }
  }

  public getAbleLink( e: MouseEvent, idx: number ) {
    if (idx === this.items.length - 1){
      e.preventDefault();
    }
  }
}
</script>

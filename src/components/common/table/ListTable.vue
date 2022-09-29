<template>
  <div class="tb-cnt" :style="{width: `${totalWidth}px`}">
    <table class="tb list">
      <colgroup>
        <col v-for="(width, idx) in colGroup" :key="`col-${idx}`" :style="{width: `${width}px`}">
      </colgroup>
      <thead>
      <tr>
        <th v-for="(title, idx) in titleList" :key="`th-${idx}`" :title="title">{{ title }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(content, row) in contentsList" :key="`tr-${row}`">
        <td v-for="(item, idx) in content" :key="`td-${idx}`" v-html="item"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ListTable extends Vue {
  @Prop(Number)
  private width!: number;
  
  @Prop(Array)
  private colGroup!: number[];
  
  @Prop(Array)
  private titleList!: string[];
  
  @Prop(Array)
  private contentsList!: any[];
  
  get totalWidth(): number {
    return this.colGroup.reduce((a: number, b: number) => a + b);
  }
}
</script>

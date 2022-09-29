<template>
  <div class="pagination-cnt" :class="addClass">
    <ul class="pagination justify-content-center">
      <li class="page-item prev">
        <a href="" @click.prevent="onPrevPageClick" class="page-link" :class="{'active':pageCount>1}"></a>
      </li>
      <li class="page-item"
          v-for="(item, index) in pageItemsModel"
          :key="`paging-${index}`" :class="{'active':pageCount===item}">
        <a href="" @click.prevent="onPageNumClick( item )" class="page-link">{{ item }}</a>
      </li>
      <li class="page-item next">
        <a href="" @click.prevent="onNextPageClick" class="page-link" :class="{'active':pageCount>0 && pageCount<totalPageCount}"></a>
      </li>
    </ul>
  </div>
  
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch} from 'vue-property-decorator';
import PagingMixins from '@/mixin/PagingMixins';

@Component
export default class Pagination extends Mixins(PagingMixins){
  @Prop(String)
  private addClass!: string;
  
  @Prop(Number)
  private total!: number;

  @Prop(Number)
  private numOfPage!: number;

  @Prop(Number)
  private pageSize!: number;

  private pageCount = 1;
  private totalPageCount=-1;
  private pageItems: number[] = [];

  // Prop 로 가져온 값을 변화할때마다 체크하여 함수 등을 실행 하고자 할때는 watch 를 써야 한다. //( 자주 사용되어선 안된다 )
  @Watch('total')
  public onChangeTotal (value: number, oldValue: number) {
    if (value !== oldValue) {
      this.createPaging();
    }
  }

  get pageItemsModel () {
    return this.pageItems;
  }

  get pageTotal () {
    return this.total;
  }

  get totalPageNum() {
    return this.totalPageCount;
  }

  public created () {
    this.createPaging();
  }

  private createPaging () {
    // console.log(this.total);
    this.pageCount=1;
    this.totalPageCount = this.getTotalPageCount({total: this.pageTotal, numOfPage: this.numOfPage});
    this.pageItems=[...this.getPageNum( {totalPageCount: this.totalPageCount, pageSize: this.pageSize, curPageNum: this.pageCount })];
    // console.log(this.pageItems);
  }

  private onPageNumClick (num: number) {
    this.pageCount=num;
    this.pageItems=[...this.getPageNum( {
      totalPageCount: this.totalPageCount,
      pageSize: this.pageSize,
      curPageNum: this.pageCount
    } )];

    // console.log(this.pageCount);
    this.$emit( 'pageChange', this.pageCount );
  }

  private onPrevPageClick () {
    if (this.pageCount <= 1) {
      this.pageCount=1;
    }else{
      this.pageCount--;
    }
    this.pageItems=[...this.getPageNum( {totalPageCount: this.totalPageCount, pageSize: this.pageSize, curPageNum: this.pageCount })];
    // console.log(this.pageCount);

    this.$emit('prev', this.pageCount );
  }

  private onNextPageClick () {
    this.pageCount++;
    if (this.pageCount > this.totalPageCount) {
      this.pageCount= this.totalPageCount;
    }
    this.pageItems=[...this.getPageNum( {totalPageCount: this.totalPageCount, pageSize: this.pageSize, curPageNum: this.pageCount })];
    // console.log(this.pageCount);
    this.$emit('next', this.pageCount );
  }
}
</script>

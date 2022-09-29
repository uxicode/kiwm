<template>
<!--
  <search-box
                add-class="input-group 에 추가할 css class"
                txt="필터데이터에 텍스트"  // items  가 없는 경우 해당 속성은 없어도 됨.
                val="필터데이터 value" // items  가 없는 경우 해당 속성은 없어도 됨.
                :items="필터데이터"   // 이게 없는 경우는  select 태그가 노출 되지 않는다.
                :selected-value="선택된 필터 value" // items  가 없는 경우 해당 속성은 없어도 됨.
                :input-data="input 에 value 값"
                @input="input 에 입력될때마다 텍스트 전달해 주는 이벤트"  // input-data  로 전달한 변수를 input 이벤트에 배치하여 입력 시켜야 한다.
                @change="필터 옵션 선택시 이벤트"
                @click="검색버튼 클릭 결과값 전달."
                ></search-box>
        <search-box
                add-class="ms-auto mgt-20"
                txt="txt"
                val="val"
                :items="searchFilterData"
                :selected-value="queryValue"
                :input-data="searchResultModel"
                @input="onSearchInput"
                @change="onSearchFilterClick"
                @click="onSearchClick"
                ></search-box>

-->
  <div class="input-group" :class="addClass" :style="{ width: width || '366px'}">
    <select-box v-if="items!==undefined"
                :width="items!==undefined? '20%' : '32%'"
                :txt="txt"
                :val="val"
                :items="items"
                :selected-value="selectedValue"
                @change="updateValue"></select-box>
    <input type="text"
           class="form-control"
           :value="inputData"
           :placeholder="placeholder"
           :style="{width: items!==undefined? '50%' : '68%'}"
           @input="onInputChange(  $event.target.value )" >
    <button class="btn btn-dark" id="button-addon2" type="button" @click="onSearch(  inputData )">검색</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Btn from '@/components/common/button/Btn.vue';
import SelectBox from '@/components/common/selectbox/SelectBox.vue';


@Component({
  components:{
    Btn,
    SelectBox
  }
})
export default class SearchBox extends Vue {

  @Prop(String)
  private readonly addClass: string | undefined;

  @Prop(String)
  private readonly val: string | undefined;

  @Prop(String)
  private readonly txt: string | undefined;

  @Prop(Array)
  public items: string[] | undefined;

  @Prop([String, Number, Date])
  public selectedValue!: string | number | Date;

  @Prop( String )
  public readonly id: string | undefined;

  @Prop( String )
  public readonly width: string | undefined;

  @Prop( String )
  public readonly inputData: string | undefined;

  @Prop(String)
  public readonly placeholder: string | undefined;

  public searchResult: string='';

  public clear() {
    this.searchResult='';
    // console.log( 'this.searchResult=', this.searchResult );
  }

  private onInputChange( value: string ) {
    this.$emit( 'input', value );
  }

  private updateValue ( value: string | number  ): void {
    // console.log( value );
    this.$emit('change', value );
  }

  private onSearch( value: string ) {
    this.$emit( 'click', value );
  }

}
</script>


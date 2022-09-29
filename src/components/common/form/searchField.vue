<template>
<!--
  <search-field
                add-class="input-group 에 추가할 css class"
                txt="필터데이터에 텍스트"
                val="필터데이터 value"
                :items="필터데이터"
                :selected-value="선택된 필터 value"
                v-model="input 에 모델 바인딩 변수"
                @change="필터 옵션 선택시 이벤트"
                @input="input 에 입력될때마다 텍스트 전달해 주는 이벤트"
                ></search-field>
        <search-field
                add-class="ms-auto mgt-20"
                txt="txt"
                val="val"
                :items="searchFilterData"
                :selected-value="queryValue"
                v-model="searchResult"
                @change="onSearchFilterClick"
                @input="onSearchInput"
                ></search-field>

-->
  <div class="input-group" :class="addClass" :style="{ width: width || '366px'}">
    <select-box width="32%"
                :txt="txt"
                :val="val"
                :items="items"
                :selected-value="selectedValue"
                @change="updateValue"></select-box>
    <input type="text"
           class="form-control"
           :value="inputData"
           :placeholder="placeholder"
           style="width:68%"
           @input="onInputChange(  $event.target.value )" >
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
export default class SearchField extends Vue {

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

  private onInputChange( value: string ) {
    this.$emit( 'input', value );
  }

  private updateValue ( value: string | number  ): void {
    // console.log( value );

    this.$emit('change', value );
  }

}
</script>


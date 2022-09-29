<template>

<!--
<drop-down
      txt="데이터의 텍스트"   // 각 항목 텍스트 key
      val="데이터의 value"
      default-value="드롭다운메뉴 디폴트 텍스트"
      width="552px"
      :items="드롭다운 리스트를 구성하는 데이터"  //구성은  Array<{ [key: string]: string | boolean | number }>
      :selected-value="드롭다운 선택 아이템"
      @click="드롭다운 버튼 클릭시"
      @select="드롭다운 리스트 클릭 이벤트"></drop-down>
      -->

  <div class="dropdown-cnt"
       :class="{'active':isDropDown}"
       data-dropdown="checkbox"
       :style="{width:width || '350px'}"
       @click="onDropDown">
    <button class="btn dropdown-options" :class="{'disabled':isDisabled}" type="button">{{ selectedValue!==''? selectedValue : defaultValue }}</button>

    <ul class="dropdown-menu">
      <template v-if="items && items.length>0">
        <li v-for="(item, index) in items" :key="`${dropdownId}-${index}`">
          <a href="javascript:void(0);" class="value-txt" @click.prevent="onSelected( item )" :style="{padding:listPadding}">
            <slot name="listItem" v-bind:item="item">
              <!-- 기본형  -->
              <span>{{ item[txt] }}</span>
            </slot>
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DropDown extends Vue {

  @Prop(String)
  private readonly dropdownId: string | undefined;

  @Prop(Array)
  private readonly items: Array<{ [key: string]: string | boolean | number }> | undefined;

  @Prop([String, Number, Boolean])
  private readonly selectedValue!: string | number | boolean;

  @Prop(String)
  private defaultValue: string | undefined;

  @Prop(String)
  private readonly val: string | undefined;

  @Prop(String)
  private readonly txt: string | undefined;

  @Prop(String)
  private width: string | undefined;

  @Prop(String)
  private listPadding: string | undefined;

  @Prop(Boolean)
  private readonly isDisabled!: boolean;

  private dropdownChk: boolean=false;

  get isExist() {
    return !!this.$slots.item;
  }

  get isDropDown() {
    if (this.isDisabled) {
      return false;
    }
    return this.dropdownChk;
  }

  public close() {
    this.dropdownChk=false;
    this.$emit( 'click', this.dropdownChk );
  }

  private onDropDown() {
    this.dropdownChk=!this.dropdownChk;
    this.$emit( 'click', this.dropdownChk );
  }

  private onSelected( item: {[key: string]: string | boolean | number} ) {
    this.$emit( 'select', item );
  }
}
</script>

<style scoped>

</style>

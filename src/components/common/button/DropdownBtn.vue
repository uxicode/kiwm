<template>
  <div class="btn-group" id="dropdown">
    <button type="button"
            :id="id"
            :style="`width:${width}px`"
            class="btn"
            :class="bindClass"
            @click="updateShow">{{ value }}</button>
    <button v-if="hasOutline"
            class="btn dropdown-toggle dropdown-toggle-split"
            :class="`btn-${btnType}`"
            @click="updateShow"></button>
    <div class="dropdown-menu" :class="{'show': isShow}">
      <a v-for="(item, idx) in items" :key="idx"
         href=""
         class="dropdown-item"
         @click.prevent="handleClick(item)">{{ item }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DropdownBtn extends Vue {
  @Prop(String)
  private id!: string;

  @Prop([Number, String])
  private readonly width: number | string | undefined;

  @Prop(String)
  private readonly btnType!: string; // 'primary', 'secondary', ...

  @Prop(Array)
  private items!: string[];

  private value: string = 'choose one';

  private isShow: boolean = false;

  get hasOutline(): boolean {
    return this.btnType.includes('outline');
  }

  get bindClass(): string {
    if (this.hasOutline)
      return `btn-${this.btnType}`;
    else
      return `btn-${this.btnType} dropdown-toggle`;
  }

  public mounted() {
    const ele = document.querySelector('#dropdown') as HTMLElement;
    document.addEventListener('click', (e: Event) => {
      // @ts-ignore
      const outsideClick = !ele.contains(e.target);
      if (outsideClick)
        this.isShow = false;
    });
  }

  private updateShow(): void {
    this.isShow = !this.isShow;
  }

  private handleClick(item: string): void {
    // console.log(`${item} selected`);
    this.value = item;
    this.updateShow();
    this.$emit('selected');
  }
}

</script>

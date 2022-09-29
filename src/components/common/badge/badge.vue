<template>
  <div class="badge" :class="getBgColor()"><slot></slot></div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Badge extends Vue{
  
  @Prop(String)
  public readonly color: string | undefined;
  
  private bgPrefix: string='bg-';

  public getBgColor(): string{
    let badgeColor: string='';
    if (this.color !== undefined) {
      badgeColor=`${this.bgPrefix}${this.color}`;
    }
    return badgeColor;
  }
}
</script>

<style scoped>

</style>

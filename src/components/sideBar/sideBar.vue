<template>
  <div class="aside-menu menu-fixed menu-dark">
    <div class="aside-header">
      <h1 class="logo">
        <router-link to="/">
          <span class="img-cnt"><img :src="require('@/assets/images/common/logo.png')" alt=""></span>
          <p class="logo-tit" v-html="topTitle"></p>
        </router-link>
      </h1>
    </div>
    <div class="aside-content">
      <ul class="navigation">
        <li class="nav-item" v-for="(mItem, mIdx) in menuItemsModel" :key="`mNav-${mIdx}`">
          <p class="nav-item-tit" v-if="mItem.tit!=='' && mItem.tit!==undefined">{{ mItem.tit }}</p>
          <ul v-if="mItem.menus!==undefined">
            <router-link tag="li" active-class="active" :to="sItem.path" v-for="(sItem, sIdx) in mItem.menus" :key="`sNav-${sIdx}`">
              <menu-item
                :is-children="sItem.children!==undefined"
                :is-title="mIdx===0 && sIdx===0"
                :icon="sItem.icon"
                :txt="sItem.txt"
                @click.native="onClick(mIdx, sIdx)"></menu-item>
              <ul class="sub-content" style="display:block" v-if="sItem.children!==undefined">
                <router-link tag="li" :to="lsItem.path" v-for="(lsItem, lsIdx) in sItem.children" :key="`lsNav-${lsIdx}`">
                  <menu-item
                    :icon="lsItem.icon"
                    :txt="lsItem.txt"
                    @click.native="onClick( mIdx, sIdx, lsIdx)"></menu-item>
                </router-link>
              </ul>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import MenuItem from '@/components/sideBar/menuItem.vue';
import { IMenuSet } from '@/model/sidebar/ISideMenu';


@Component({
  components:{
    MenuItem
  }
})
export default class SideBar extends Vue {

  @Prop(Array)
  public readonly menuItems!: IMenuSet[];

  private topTitle: string='KiwoomHeroes<br> APP Admin';

  get menuItemsModel(): IMenuSet[]{
    return this.menuItems;
  }

  @Emit()
  onClick(mIdx: number, sIdx: number, lsIdx?: number) {
    // console.log( 'click', mIdx, sIdx, lsIdx );
    this.$emit( 'click', mIdx, sIdx, lsIdx );
  }

}
</script>

<style scoped>

</style>

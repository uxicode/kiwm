import { Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { SideBarMutationType } from '@/store/moduleType/SideBarMutationType';
import { ISideMenuNum } from '@/model/sidebar/ISideBarNum';


@Module( {
  namespaced: true,
} )
export default class SideBarModule extends VuexModule {
  private selectedIndexItems: ISideMenuNum={ mIdx:0, sIdx:0, lsIdx: -1};

  get selectedIdxItems(): ISideMenuNum {
    return this.selectedIndexItems;
  }

  @Mutation
  public [SideBarMutationType.UPDATE_NUM](nums: ISideMenuNum): void {
    this.selectedIndexItems=nums;
  }
};

<template>
  <div style="font-size:12px;">
    <p v-if="title!==undefined">{{ title }}</p>
    <p v-if="dateNum!==undefined">{{ dateNum }}</p>
    <badge :color="getBadgeStatus().color">{{getBadgeStatus().txt}}</badge>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import Badge from '@/components/common/badge/badge.vue';

@Component({
  components:{
    Badge,
  }
})
export default class StatusBadge extends Vue{
  
  @Prop(String)
  public readonly title: string | undefined;
  
  @Prop(Number)
  public readonly dateNum: number | undefined;

  @Prop([Number, String])
  public readonly status: number | string | undefined;
  
  private statusInfo: any[]=[
    { txt:'진행중', color:'blue', code:1},
    { txt:'마감일', color:'purple', code:2},
    { txt:'진행예정', color:'success',code:3},
    { txt:'종료', color:'secondary', code:4},
    { txt:'마감', color:'danger', code:5},
    { txt:'일시중지', color:'warning', code:6},
  ];
  

  //type - 라이브 이벤트, 일반 이벤트, 외부링크 
  public getBadgeStatus() {
    //진행중 D-7, 마감일 D-day (-01:00), 진행예정 D+7, 종료, 마감D-day, 일시중지 링크
    //Proceeding, deadline, to proceed, end, close, pause
    let result: { txt:string, color:string, code:number }={ txt:'', color:'', code:0 };
    if (this.status !== undefined) {
      const findIdx=this.statusInfo.findIndex((item)=>item.code===this.status);
      if (findIdx !== -1) {
        result=this.statusInfo[findIdx];
      }
    }
    return result;
  }
}
</script>


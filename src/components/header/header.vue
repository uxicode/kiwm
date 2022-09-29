<template>
  <header>
    <nav class="header-navbar navbar navbar-expand-lg">
      <div class="navbar-container d-flex content">
        <div class="bookmark-wrapper d-flex align-items-center">
          <ul class="nav navbar-nav bookmark-icons">
            <li class="nav-item" v-for="(item, index) in bookmarkInfoModel" :key="`bookmark-${index}`">
              <a :href="item.link" class="nav-link">
                <span class="badge" :class="item.bdStat">{{ item.status }}</span>
                <i :class="item.icon"></i>
                <span class="tit">{{item.tit}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="nav navbar-nav align-items-center ms-auto" v-if="meInfo">
          <div class="nav-item dropdown dropdown-user" :class="{'active':isProfileChk}">
            <a class="nav-link dropdown-toggle dropdown-user-link" @click.prevent="onProfileClick" >
              <div class="user-nav pdr-10">
                <span class="user-name fw-bolder">{{ meInfo.name }}</span>
                <span class="user-status">{{ getAdminLevel(meInfo.isSystem) }}</span>
              </div>
              <i class="icon-chevron-down"></i>
            </a>

            <transition name="backOut" mode="out-in">
              <ul class="user-menu" v-if="isProfileChk">
                <li><a href="#" @click.prevent="onPwdChangeClick"><i class="icon-lock"></i><span class="item">비밀번호 변경</span></a></li>
                <li><a href="#" @click.prevent="logout"><i class="icon-log-out"></i><span class="item">로그아웃</span></a></li>
                <li class="dropdown-divider"></li>
                <li><a href="#" @click.prevent="onCreateSeasonClick"><i class="icon-calendar"></i><span class="item">시즌일정 생성하기</span></a></li>
              </ul>
            </transition>

          </div>

        </div>
      </div>

    </nav>
    <notice-popup
        :msg="modalMsg"
        :is-open="isNoticePopup"
        @confirm="onNoticePopupClick"
        @change="isNoticePopup=false"></notice-popup>

    <!--    확인 취소 팝업 -->
    <confirm-popup :msg="modalMsg"
                   :is-open="isConformPopup"
                   @confirm="onConfirmPopupClick"
                   @change="onConfirmCloseClick"></confirm-popup>
  </header>

</template>

<script lang="ts">

import {Vue, Component} from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { UserMutationType } from '@/store/moduleType/AuthMutationTypes';
import { AdminManageMutationType } from '@/store/moduleType/AdminManageMutationType';
import { GameService } from '@/restApi/service/GameService';
import NoticePopup from '@/components/common/modal/noticePopup.vue';
import ConfirmPopup from '@/components/common/modal/confirmPopup.vue';
import dayjs from 'dayjs';
import { IAdminUserMe } from '@/model/admin/AdminUserModel';
import { isUser } from '@/core/auth/utils';

const Auth=namespace( 'Auth' );
const AdminMg=namespace( 'AdminMg' );


@Component({
  components:{
    NoticePopup,
    ConfirmPopup
  }
})
export default class Header extends Vue{

  @AdminMg.Mutation
  private [AdminManageMutationType.PASSWORD_CHANGE]!: ( chk: boolean)=> void;

  @Auth.Mutation
  private [UserMutationType.LOGOUT]!: () => void;

  @Auth.Mutation
  public [UserMutationType.INFO_UPDATE]!: ()=> void;

  @Auth.Getter
  private isMe!:  IAdminUserMe | null;

  private isProfileChk: boolean=false;
  private isNoticePopup: boolean=false;
  private isConformPopup: boolean=false;
  private currentPopupStatus: string='';

  private bookmarkInfos: any[]=[
    // {tit: '경기 라이브', status: 'LIVE!', bdStat:'bg-info', icon:'icon-radio', link:''},
    // {tit: '이벤트 마감', status: '1', bdStat:'bg-danger', icon:'icon-gift' , link:''},
    // {tit: '1:1 문의', status: 'N', bdStat:'bg-danger', icon:'icon-headphones' , link:''}
  ];

  private CREATED_SEASON_COMPLETE: string = 'createSeasonComplete';
  private CREATED_SEASON_TRY: string = 'createSeasonTry';
  private CREATED_SEASON_ERROR: string = 'createSeasonError';
  private LOGOUT_TRY: string = 'logoutTry';

  private modalMsgData:Array<{[key: string]: string}>= [
    {status:this.LOGOUT_TRY, desc:'로그아웃 하시겠습니까?'},
    {status:this.CREATED_SEASON_TRY, desc:`${dayjs(new Date()).format('YYYY')} 정규시즌 일정을 생성하시겠습니다까?`},
    {status:this.CREATED_SEASON_COMPLETE, desc:`${dayjs(new Date()).format('YYYY')} 시즌 일정이 생성 되었습니다.`},
    {status:this.CREATED_SEASON_ERROR, desc:'시즌 일정 생성 실패 \n'+'시즌 일정 생성 실패하였습니다.'},
  ];

  get meInfo(): IAdminUserMe | null{
    if (!this.isMe) {
      //localStorage.getItem( AuthConfig.ME_KEY ) 가 존재할 경우에만
      if (isUser()) {
        this[UserMutationType.INFO_UPDATE]();
      }
    }
    return this.isMe;
  }

  /**
   * 공통 모달에 알맞는 상세 텍스트 전달.
   */
  get modalMsg(): string{
    const findItem=this.modalMsgData.filter((item:{[key:string]:string}) => item.status === this.currentPopupStatus);
    return (findItem.length>0)? findItem[0].desc : '';
  }

  get bookmarkInfoModel() {
    return this.bookmarkInfos;
  }

  public mounted() {
    document.body.addEventListener( 'click', this.onOutSideClick, true);
  }

  public onOutSideClick(evt: Event ) {
    const dropDownBtn=document.querySelector('.dropdown-user-link') as HTMLElement;
    if (dropDownBtn) {
      const ele=evt.target as HTMLElement;

      //드롭다운 엘리먼트가 속해있지 않는 경우 - 즉 outside 클릭시
      if ( !dropDownBtn.contains( ele) ) {
        this.isProfileChk=false;
      }
    }
  }

  public getAdminLevel( isSystem: boolean ) {
    return (isSystem) ? '슈퍼관리자' : '일반관리자';
  }

  public onProfileClick() {
    this.isProfileChk=!this.isProfileChk;
    // console.log( 'dropdown click' );
  }

  public logout() {
    this.openConfirmPopup( this.LOGOUT_TRY );
  }

  public onPwdChangeClick() {
    this[AdminManageMutationType.PASSWORD_CHANGE]( true );
  }

  public onCreateSeasonClick() {
    this.openConfirmPopup( this.CREATED_SEASON_TRY );
  }

  /**
   * notice popup -> 확인 버튼 눌렀을때 이벤트 핸들러
   * @param result
   * @private
   */
  public onNoticePopupClick(result: boolean) {
    this.isNoticePopup=false;
    if (result) {

      if (this.currentPopupStatus === this.CREATED_SEASON_ERROR) { //시즌일정 생성 실패
        location.reload();
      }
    }
  }

  private openNoticePopup( status: string='') {
    this.isNoticePopup=true;
    this.currentPopupStatus=status;
  }


  public openConfirmPopup( status: string='') {
    this.isConformPopup=true;
    this.currentPopupStatus=status;
  }

  public onConfirmPopupClick(result: boolean) {
    // console.log( 'result=', result );
    if (result) {
      if (this.currentPopupStatus === this.CREATED_SEASON_TRY) {
        GameService.setGameSchedule()
            .then( (data)=>{
              // console.log( '시즌일정 생성', data );
              this.openNoticePopup( this.CREATED_SEASON_COMPLETE );
            } ).catch((error:any)=>{
          console.log( error );
          this.openNoticePopup( this.CREATED_SEASON_ERROR );
        });
      }else if (this.currentPopupStatus === this.LOGOUT_TRY) {
        this[UserMutationType.LOGOUT]();
        this.$router.push('/login')
            .catch((error)=>{
              console.log( 'logout 에러', error );
            });
      }
    }
  }

  public onConfirmCloseClick( value: boolean ) {
    this.isConformPopup=value;
  }



}
</script>


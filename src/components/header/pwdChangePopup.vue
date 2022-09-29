<template>
  <transition name="modal">
    <modal size="600px" header-add-class="bd-type" @close="popupChange(false)">
      <template v-slot:header>
        <h5 class="modal-title">비밀번호 변경</h5>
        <button type="button" class="btn-close" @click="popupChange(false)"></button>
      </template>
      <template v-slot:body>
        <div class="pw-form">
          <div class="form-cnt">

            <div class="form-group">
              <txt-field
                  id="oldPwd"
                  input-type="password"
                  size="370px"
                  label="기존 비밀번호"
                  label-add-class="pdb-5"
                  placeholder="기존 비밀번호를 입력해 주세요"
                  v-model="pwdForm.oldPassword"
                  rules="required"
                  valid-name="기존 비밀번호"
                  @change="isOldPasswordCheck">
              </txt-field>
            </div>
            <!--start : 새 비밀번호 서로 비교 -->
            <ValidationObserver>
              <div class="form-group">
                <!--                <label for="inLb2">새 비밀번호</label>
                                <input type="password" class="form-control" id="inLb2">
                                <small class="form-message error">* 아이디와 동일한 문자 또는 숫자를 비밀번호로 사용하실 수 없습니다.</small>-->
                <txt-field
                    input-type="password"
                    size="370px"
                    label="새 비밀번호"
                    label-add-class="pdb-5"
                    placeholder="새 비밀번호를 입력해 주세요"
                    v-model="pwdForm.newPassword"
                    max-len="20"
                    rules="pwd|required"
                    valid-name="새비밀번호"
                    @change="isPwdCheck">
                </txt-field>
              </div>
              <div class="form-group">
                <!--                <label for="inLb3">새 비밀번호 확인</label>
                                <input type="password" class="form-control" id="inLb3" placeholder="새 비밀번호를 확인해 주세요">
                                <small class="form-message error">비밀번호가 일치하지 않습니다.</small>-->
                <txt-field
                    input-type="password"
                    size="370px"
                    label="새 비밀번호 확인"
                    placeholder="새 비밀번호를 확인해 주세요"
                    v-model="pwdForm.confirmPassword"
                    max-len="20"
                    rules="required|confirmed:@새비밀번호"
                    valid-name="새비밀번호 확인"
                    @change="isConfirmCheck"></txt-field>
              </div>
            </ValidationObserver>
            <!--end : 새 비밀번호 서로 비교 -->

          </div>
          <div class="notice-cnt">
            <strong>※ 비밀번호 입력 시 유의사항</strong>
            <ul class="notice-list">
              <li>- 영문, 숫자, 특수문자를 모두 사용하여 8자 이상 20자 이하로 입력해주세요.</li>
              <li>- 아이디와 동일한 문자 또는 숫자를 비밀번호로 사용할 수 없습니다.</li>
            </ul>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="btn-cnt text-center">
          <!--         <button type="button" class="btn btn-outline-primary btn-lg">취소</button>
                   <button type="button" class="btn btn-primary btn-lg mgl-7">변경</button>-->
          <btn type="outline" color="primary" size="lg" @click="updateConfirm(false)">취소</btn>
          <btn color="primary" size="lg" add-class="mgl-7" :disabled="!allValidation" @click="updateConfirm( true )">변경</btn>
        </div>
      </template>
    </modal>
  </transition>

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Modal from '@/components/common/modal/modal.vue';
import Btn from '@/components/common/button/Btn.vue';
import TxtField from '@/components/common/form/txtField.vue';

@Component( {
  components: {
    Modal,
    Btn,
    TxtField
  }
} )
export default class PwdChangePopup extends Vue {

  @Prop( String )
  public readonly title: string | undefined;

  private isOldPassword: boolean=false;
  private isPwdValid: boolean=false;
  private isConfirmPwd: boolean=false;

  private pwdForm: {
    newPassword: string,
    oldPassword: string,
    confirmPassword: string
  }={
    newPassword: '',
    oldPassword: '',
    confirmPassword: ''
  };

  get allValidation() {
    return this.isOldPassword && this.isPwdValid && this.isConfirmPwd;
  }

  public clear():void{
    const pwInput=document.getElementById( 'oldPwd' ) as HTMLInputElement;
    pwInput.focus();
    this.pwdForm.oldPassword='';
  }

  public isOldPasswordCheck(pass: boolean) {
    this.isOldPassword=pass;
  }

  public isConfirmCheck(pass: boolean) {
    this.isConfirmPwd=pass;
  }

  private isPwdCheck(pass: boolean) {
    this.isPwdValid=pass;
  }

  private updateConfirm(result: boolean) {
    // this.popupChange( false );
    const {oldPassword, newPassword}=this.pwdForm;

    if (!result) {
      this.popupChange( false );
    }

    if (this.allValidation) {
      this.$emit( 'confirm', result, {oldPassword, newPassword} );
    }else{
      this.$emit( 'confirm', result, null );
    }

  }

  private popupChange(value: boolean) {
    this.$emit( 'close', value );
  }


}
</script>

<style scoped>

</style>

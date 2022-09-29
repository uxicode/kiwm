<template>
  <div>
    <div v-show="isLoadBtn!==undefined && isLoadBtn" class="img-upload d-inline-block" @click.stop="addImgFileInputFocus">
      <button type="button" v-show="isLoadBtn!==undefined && isLoadBtn"><i class="icon-plus"></i></button>
      <input class="input-file" type="file" name="files" :id="inputId" :accept="loadFileType" @change.self="addFileToImage( $event.target.files )" hidden >
    </div>

    <div class="d-inline-block uploaded-img" v-if="fileItem!==undefined && fileItem!==''">
      <button v-if="isDeleteBtn!==undefined && isDeleteBtn" type="button" class="btn-delete" @click.prevent="onRemove"><i class="icon-x1"></i></button>
      <img :src="fileItem" alt="이미지">
      <button v-if="isModify"
              type="button"
              class="btn-modify"
              @click="onModify">수정</button>
    </div>
<!--    * 메인배너 사이즈 : 292*217px / JPG,JPEG,PNG / 최대 1MB-->
    <p class="hint" v-if="comment">{{ comment }}</p>
<!--    <p class="hint" style="margin-top:-30px;" v-else>등록된 이미지가 없습니다.</p>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import Btn from '@/components/common/button/Btn.vue';
import { Utils } from '@/utils/utils';

@Component({
  components:{
    Btn
  }
})
export default class ImgPreview extends Vue{

  @Prop(Boolean)
  private isLoadBtn: boolean | undefined;

  @Prop(Boolean)
  private isDeleteBtn: boolean | undefined;

  @Prop(Boolean)
  private isModify: boolean | undefined;

  @Prop(String)
  private inputId!: string;  //반드시 입력되어야만 한다.

  @Prop(String)
  private comment: string | undefined;

  @Prop(String)
  private fileItem: string | undefined;

  @Prop(String)
  private loadFileType: string | undefined;


  private addFileToImage( files: FileList ){
    this.$emit( 'load', files, `#${this.inputId}` );
  }

  private onRemove(): void{
    const imgFileInput = document.querySelector(`#${this.inputId}`) as HTMLInputElement;
    imgFileInput.value='';
    this.$emit('remove', this.inputId );
  }

  private onModify(): void{
    this.addImgFileInputFocus();
    this.$emit( 'modify', this.inputId );
  }

  /**
   * 이미지등록 아이콘 클릭시 > input type=file 에 클릭 이벤트 발생시킴.
   * @private
   */
  public addImgFileInputFocus() {
    this.inputEventBind(`#${this.inputId}`);
  }

  //모델에 이미지 파일 추가
  public inputEventBind( targetSelector: string ) {
    //파일 input 에 클릭 이벤트 붙이기~
    const imgFileInput = document.querySelector(targetSelector) as HTMLInputElement;
    // console.log( imgFileInput );
    //input click event 발생시키기.
    // imgFileInput.dispatchEvent( Utils.createMouseEvent('click') );
    imgFileInput.click();
  }

}
</script>

<style scoped>

</style>

<template>
  <!--
  <txt-editor init-text="- 경기 관람을 원하시는 일자의 최소 7일 전까지 신청 주셔야 가능합니다. " // 에디터에 초기에 입력할 데이터 전달.
               :width="930" // editor width
               :height="458" // editor height
               @change="onUpdateEditor">  // 부모 클래스에 에디터에 작성한 결과물 html 태그 전달.
               </txt-editor>
  -->
  <div>
    <!--   @beforeGetContent 에서 @input 으로 변경   -->
    <editor v-model="editorTextBindingModel" :disabled="isDisabled" :init="editorInit" :id="editorId" :ref="editorId" @input="getContent"></editor>
    <!--  image local file upload 를 위한 input -->
    <input name="image" type="file" :id="uploadId"  accept="image/*" style="display: none;">
    <!--    <btn type="info" size="btn-sm" add-class="mgt-20" @click="getHtml">getHtml</btn>-->
    <!--    <p>{{htmlForEditor}}</p>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Editor from '@tinymce/tinymce-vue';
import Btn from '@/components/common/button/Btn.vue';
import { getTinymce } from '@tinymce/tinymce-vue/lib/cjs/main/ts/TinyMCE';
import { FileService } from '@/restApi';
import { DataProviderType } from '@/core/data/DataProvider';


@Component({
  components:{
    Btn,
    Editor
  }
})
export default class TxtEditor extends Vue{

  @Prop(Number)
  private width!: number;

  @Prop(Number)
  private height!: number;

  @Prop(String)
  private editorId: string | undefined;

  @Prop(String)
  private uploadId: string | undefined;

  @Prop(String)
  public initText: string | undefined;

  @Prop(Boolean)
  public isDisabled: boolean | undefined;

  @Prop(String)
  public placeholder: string | undefined;

  @Prop(Function)
  public fetch!: any;

  public htmlForEditor: string='';
  public editorTextBindingModel: string='';
  public editorInstance: any;

  public editorInit: any = {
    // selector: 'textarea#open-source-plugins',
    branding: false, // ( 우측 하단 tiny 브랜드명 )
    deprecation_warnings: false,
    elementpath: false, // 좌측 하단 p( 문장 글 선택 )
    language: 'ko_KR',
    forced_root_block: 'div', //초기 생성 태그
    fontsize_formats:'11pt 12pt 13pt 14pt 18pt 24pt 30pt 36pt 48pt',
    // placeholder: '내용을 입력해 주세요.',
    plugins: 'print preview paste autolink code visualblocks visualchars image link media table hr toc insertdatetime advlist lists textpattern help quickbars', //imagetools( 이미지편집툴), wordcount( 하단 우측 워드카운트 ) charmap, emoticons, save, directionality, fullscreen, template, codesample, anchor
    // imagetools_cors_hosts: ['picsum.photos'],
    menubar: false, /// 'file edit view insert format tools table help',  // 옵션 false - 안보임 처리
    toolbar: 'undo redo | bold italic underline | fontsizeselect formatselect | align outdent indent | forecolor backcolor removeformat | link table', //preview fontselect, charmap, emoticons, codesample, alignleft, aligncenter, alignright, alignjustify
    toolbar_sticky: false, // 스크롤 시 툴바 고정 여부
    // autosave_ask_before_unload: true,
    // autosave_interval: '30s',
    // autosave_prefix: '{path}{query}-{id}-',
    // autosave_restore_when_empty: false,
    // autosave_retention: '2m',
    // image_advtab: true,
    /*link_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],*/
    /*image_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],*/
    // importcss_append: true,
    link_title: false,
    link_quicklink: true,
    images_file_types: 'jpg,svg,png,webp',
    // link_assume_external_targets: true,
    // image_caption: true, // figcaption 삽입 여부
    quickbars_selection_toolbar: 'bold italic | quicklink fontsizeselect blockquote align', // 드래그 선택 해서 나오는 팝오버메뉴  quickimage quicktable
    quickbars_insert_toolbar: false, // 'quickimage quicktable | hr pagebreak'
    guickbars_image_toolbar: false,
    // noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'wrap', //'floating', 'sliding', 'scrolling', or 'wrap'
    contextmenu: 'link image imagetools table',  //
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px} img{max-width:100%;min-width:50%;height:auto;}',
    media_poster: false, // 미디어 고급 기능에서 대체 원본 url input
    media_alt_source: false, // 미디어 고급 기능에서 대표 이미지 input
    paste_data_images: true, // image drag&drop
    automatic_uploads: true,
    images_upload_credentials: true,
    file_picker_types: 'image', //media ( 이미지, 미디어, 링크 등의 다이얼로그가 나왔을때 업로드 버튼 표시여부- 업로드 기능은 file_picker_callback 에서 별도 처리해야 한다.  )
    images_reuse_filename: true, //업로드 되어 리턴한 새로운 이미지 주소를 현재 에디터에 바로 반영해주는 옵션
    toolbar_items_size: 'small',
    relative_urls: false,  // 이미지 경로 상대경로로 할지 설정.
    remove_script_host: false // 스크립트 호스트 설정.
  };

  public editorText: string = '';

  get editorModel(): any {
    return getTinymce().activeEditor;
  }

  public created() {
    // this.HISTORY_PAGE('login');
    // console.log('findUserId=', this.findUserId);
    // console.log('userName=', this.userName);
    if (this.initText) {
      this.editorTextBindingModel=this.initText;
    }
    this.editorInit={
      ...this.editorInit, ...{
        width: this.width || 1000,
        height: this.height || 600,
        file_picker_callback: this.getFilePicker,
        images_upload_handler: this.imageUploadHandler,
        placeholder: this.placeholder,
        setup: this.setupEditor
      }
    };
  }

  public getContentInfo(): string{
    return this.editorTextBindingModel;
  }


  //setup
  //해당 코드가 없으면 submit 을 두번씩 눌러야 업데이트된 내용이 반영된다.
  public setupEditor(editor: any) {
    this.editorInstance = editor;
    editor.on('change',  (e: any)=>{
      editor.save();
    });
  }

  //images_upload_handler
  public imageUploadHandler( blobInfo: {
                              base64: any, // 타입은 Function
                              blob: any, // 타입은 Function
                              blobUri: any, // 타입은 Function
                              filename: any, // 타입은 Function - 값은 id 값에서 확장자만 붙는 형태
                              id: any, // 타입은 Function - 값은 위에서 file_picker_callback 에서 설정했던 id
                              name: any, // 타입은 Function
                              uri: any // 타입은 Function
                            },
                             // success, failure, progress 모두 function type
                            success: any, failure: any, progress: any) {
    //failure('HTTP Error: ' + xhr.status);
    /*
    xhr.upload.onprogress = function (e) {
      progress(e.loaded / e.total * 100);
    };
    여기서 axios 통신을 해야 한다.
    */
    /* success 함수 쓰는 법
    setTimeout(function () {
       /!* no matter what you upload, we will turn it into TinyMCE logo :)*!/
       success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
     }, 2000);*/
    // 아래 formData 를 post method 등으로 axios 에 같이 전송해 주면 된다.
    const formData = new FormData();
    // console.log( blobInfo.id(), blobInfo.blob(), blobInfo.filename() );
    formData.append(DataProviderType.FILE_APPEND_KEY, blobInfo.blob(), blobInfo.filename());
    FileService.setAttachFile( formData )
      .then( (data: any)=>{
        // console.log( data );
        //{id: '003c4aab183f46f1b40890d6b8d38c4f', path: '/attachment/003c4aab183f46f1b40890d6b8d38c4f'}
        success( FileService.getImageFileView(data.id) );
      } ).catch( (error: any)=>{
      console.log( '이미지첨부 error=', error );
    } );
  }

  //file_picker_callback
  public getFilePicker( callback: any, value: any, meta:any ) {
    // console.log( meta.filetype );
    /* 아래는 로컬에 있는 파일 업로드시 예시 코드들
    if (meta.filetype == 'file') {
      callback('mypage.html', {text: 'My text'});
    }
    // Provide image and alt text for the image dialog
    if (meta.filetype == 'image') {
      callback('myimage.jpg', {alt: 'My alt text'});
    }
    // Provide alternative source and posted for the media dialog
    if (meta.filetype == 'media') {
      callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
    }*/
    if (meta.filetype === 'image') {
      //<editor></editor> 선언 후 바로 아래에
      // <input name=image type=file id="upload" onchange="" style="display: none;"> 라고
      // 숨김처리 해두고 에디터에서 업로드 버튼을 누를시 이부분의 코드가 실행되기에
      // 숨겨둔 input 버튼을 강제 클릭시켜서 파일 업로드 형태를 띄우게 하고 사용자가 입력시 해당 파일 정보만 퍼온다.
      const uploadBtn= ( document.getElementById('upload') as HTMLElement);

      uploadBtn.addEventListener('change',  ( e: Event ) =>{
        // const target= e.target as HTMLInputElement;
        const inputBtn=(e.target as HTMLInputElement);
        const file: File = ( inputBtn.files as FileList)[0];
        // console.log( file );
        const reader: FileReader = new FileReader();

        reader.onload = ( progressEvt: ProgressEvent<FileReader>) => {
          const id = 'imgId_' + (new Date()).getTime();
          const blobCache =  getTinymce().activeEditor.editorUpload.blobCache;
          const base64 = String( (progressEvt.target as FileReader).result ).split(',')[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          callback(blobInfo.blobUri(), { title: file.name });
        };
        reader.readAsDataURL(file);
      });
      //미리 숨겨둔 업로드 버튼을 강제 클릭~
      uploadBtn.click();
    }
  }

  public getContent(a:any) {
    // console.log( a );
    this.getHtml();
    this.$emit( 'change', this.editorTextBindingModel );
  }

  private getHtml(): void {

    this.$nextTick( ()=>{
      //실질적으로 이미지를 서버에 업로드 시키는 이벤트
      this.editorModel.uploadImages( (success: any)=>{
        // console.log( 'success=', success );
      } );
      this.htmlForEditor=getTinymce().activeEditor.getContent();
      // console.log( this.htmlForEditor );
    });

  }

}
</script>

<style lang="scss">
.tox-notification--warning {
  display: none !important;
}
.tox .tox-tbtn--bespoke .tox-tbtn__select-label{width:3em !important;}
</style>

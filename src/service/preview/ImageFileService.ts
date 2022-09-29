import { IFile } from '@/service/preview/IFile';


/**
 * @example   private imgFileService: ImageFileService=new ImageFileService();
 * @example   this.imgFileService.load(files, '#imgFileInput');//이미지 파일 추가 - files타입은 FileList
 * @example   this.imgFileService.save( this.formData ); 최종 formdata 에 이미지 파일 저장.
 * @example  this.imgFileService.remove(idx);   추가된 이미지 미리보기 파일 제거하기
 * @example  this.imgFileService.removeAll();  추가된 이미지 파일 모두 지우기
 * @example  this.formData.delete('files');   등록을 완료후 formdata 및 배열에 지정되어 있던 데이터들 비우기..
 * @example  this.imgFileService.getItems(); -
 */
class ImageFileService implements IFile {

    public imgFileItem: { file: FileList | null, key: string, url: string }={ file: null, key: '', url: '' };
    public inputSelector: string='';
    // public imgURLFileItems: string[] = [];
    //start : IFile 에 있는 필수 선언 메서드 ================================================
    public getItem(): string[] | string {
        //this.imgFileItems;
        // console.log('imgFileItem.url=', this.imgFileItem.url );
        return this.imgFileItem.url;
    }

    public getFileItem(): any {
        return this.imgFileItem.file;
    }

    public setAttachItems(item: { key: string, url: string }): void {
        const { key, url }=item;
        this.imgFileItem={ file: null, key, url };
    }

    /*public getImgURLItems(): string[] {
      return this.imgURLFileItems;
    }*/

    //모델에 이미지 파일 추가
    public load(files: FileList, selector: string, key: string): void {
        // console.log( files );
        if (!files) {
            return;
        }
        this.setImgFilePreviewSave( files, key );
        this.inputSelector=selector;
        //file type input --> 팝업으로 미리보기
        /*const imgFileInput =document.querySelector(selector) as HTMLInputElement;
        imgFileInput.value = '';*/
    }

    /**
     * 모두 지우기
     */
    // public removeAll(): void {
    //   // this.imgURLFileItems = [];
    //   this.imgFileItems=[];
    // }
    /**
     * 추가된 이미지 파일 제거하기
     */
    public remove(): void {

        if (this.imgFileItem.url.indexOf( 'blob' ) !== -1) {
            this.removeBlobURL( this.imgFileItem.url ); // blob url 제거
        }
        this.imgFileItem={ file: null, key: '', url: '' };

    }

    // public reset() {
    //   this.removeAll();
    // }

    /**
     * 신규로 add 된 이미지가 있는지 체크
     */
    // public getAddFiles(){
    //  return this.imgFileItems
    //    .filter((item) => item.file.name !== undefined)
    //    .map((item)=>item.file);
    // }
    /**
     *  이미지 파일이 저장된 배열을 전송할 formdata 에 값 대입.
     */
    public save(formData: FormData, appendKey: string): void {
        if (!this.imgFileItem) {
            return;
        }
        if (this.imgFileItem.file !== null) {
            // console.log( this.imgFileItem.file );
            const file: File=(this.imgFileItem.file as FileList)[0];
            // console.log( 'file', file );
            // 아래  'files'  는  전송할 api 에 지정한 이름이기에 맞추어야 한다. 다른 이름으로 되어 있다면 변경해야 함.
            this.formDataAppendToFile( formData, file, appendKey );
        }
    }

    //end : IFile 에 있는 필수 선언 메서드 ================================================

    /**
     * // blob url 폐기시키고 가비지 컬렉터 대상화시킴
     * - 확인하는 방법은 현재 이미지에 적용된 src 주소값을 복사해서 현재 브라우저에 주소를 붙여 실행해 보면 된다. 이미지가 보이면 url 이 폐기되지 않은 것이다.
     * @private
     */
    public removeBlobURL(target: string | string[]) {
        if (Array.isArray( target )) {
            target.forEach( (item)=>URL.revokeObjectURL( item ) );
        } else {
            URL.revokeObjectURL( target );
        }

    }

    //formdata 에 append 하여 formdata ( 딕셔너리 목록 ) 추가하기.
    public formDataAppendToFile(formData: FormData, file: File, appendName: string) {
        formData.append( appendName, file, file.name);
    }

    /**
     * 이미지 파일 -> 배열에 지정 / 미리보기 link( blob link) 배열 생성~
     * @param files
     * @param key
     */
    public setImgFilePreviewSave(files: FileList, key: string): void {
        // console.log( files, files[0] );
        this.imgFileItem={ file: files, key: key, url: URL.createObjectURL( files[0] ) };
    }


}

export { ImageFileService };


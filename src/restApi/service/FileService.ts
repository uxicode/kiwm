import { request } from '@/restApi';
import { AttachFile } from '@/restApi/base';


class FileService {

    public static setAttachFile(formData: FormData): Promise<any> {
        return request( 'post', `${ AttachFile.BASE_URL }/attach`, formData );
    }

    // 이미지 뷰 ~
    public static getAttachFile(id: string): Promise<any> {
        return request( 'get', `${ AttachFile.BASE_URL }/${ id }` );
    }

    public static getImageFileView(id: string): string {
        return `${process.env.VUE_APP_API_BASE_URL}${AttachFile.BASE_URL}/${ id }`;
    }

}


export {
    FileService
};

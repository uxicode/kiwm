import {IContact, IContactDetail} from '@/model/contact/IContact';
import {ContactService} from '@/restApi/service/ContactService';
import {Promise} from 'es6-promise';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import {ContactActionType} from "@/store/moduleType/ContactActionType";
import {ContactMutationType} from "@/store/moduleType/ContactMutationType";

@Module( {
    namespaced: true,
} )
export default class ContactModule extends VuexModule {

    private contactItems: IContact[]=[];
    private contactListTotalNum: number=0;
    private contactListPageSizeNum: number=0;
    private contactListPageEndNum: number=0;
    private contactDetailData: IContactDetail | null = null;

    get contactList(): IContact[] {
        return this.contactItems;
    }

    get contactTotal(): number {
        return this.contactListTotalNum;
    }

    get contactPageSize(): number {
        return this.contactListPageSizeNum;
    }

    get contactPageEnd(): number {
        return this.contactListPageEndNum;
    }

    get contactDetail(): IContactDetail | null {
        return this.contactDetailData;
    }

    @Mutation
    public [ContactMutationType.UPDATE_CONTACT_LIST](items:
        { contactItems: IContact[], count: number, size: number, end: number}): void {
        const {contactItems, count, size, end} = items;
        this.contactItems = contactItems;
        this.contactListTotalNum = count;
        this.contactListPageSizeNum = size;
        this.contactListPageEndNum = end;
    }

    @Mutation
    public [ContactMutationType.UPDATE_CONTACT_DETAIL](data: IContactDetail) {
        this.contactDetailData = data;
    }

    @Action({rawError: true})
    public [ContactActionType.CONTACT_LIST](payload: {
        page?: number,
        contactStatusType?: string,
        contactType?: string,
        endDateAt?: string,
        startDateAt?: string
    }): Promise<any> {
        // const {page, filterInfo} = payload;
        return ContactService.getContactList(payload)
            .then((data: any) => {
               this.context.commit(ContactMutationType.UPDATE_CONTACT_LIST, {
                   contactItems: data.contents,
                   count: data.contentCount,
                   size: data.pageSize,
                   end: data.pageEnd
               });
               return Promise.resolve(data.contents);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }

    @Action({rawError: true})
    public [ContactActionType.CONTACT_DETAIL_VIEW](contactSeq: number): Promise<any> {
        return ContactService.getContactDetail(contactSeq)
            .then((data: any) => {
               this.context.commit(ContactMutationType.UPDATE_CONTACT_DETAIL, data);
               return Promise.resolve(data);
            })
            .catch((error: any) => {
                return Promise.reject(error);
            });
    }




}

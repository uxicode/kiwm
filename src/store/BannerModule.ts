import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { IBanner } from '@/model/banner/IBanner';
import { BannerMutationType } from '@/store/moduleType/BannerMutationType';
import { BannerActionType } from '@/store/moduleType/BannerActionType';
import { BannerService } from '@/restApi/service/BannerService';
import { IGeneral } from '@/model/event/IGeneral';


@Module( {
    namespaced: true,
} )
export default class BannerModule extends VuexModule {

    private banners: IBanner[]=[];
    private bannerDetail: IBanner | null =null;
    private eventListItems: IGeneral[]=[];

    get eventList(): IGeneral[] {
        return this.eventListItems;
    }

    get bannerList(): IBanner[] {
        return this.banners;
    }

    get bannerDetailItem(): IBanner | null{
        return this.bannerDetail;
    }

    @Mutation
    public [BannerMutationType.UPDATE_LIST](banners: IBanner[]): void {
        // console.log('token=', this.token);
        this.banners=banners;
    }

    @Mutation
    public [BannerMutationType.UPDATE_DETAIL]( bannerDetail: IBanner): void {
        // console.log('token=', this.token);
        this.bannerDetail=bannerDetail;
    }

    @Mutation
    public [BannerMutationType.UPDATE_EVENT_LIST]( items: IGeneral[]): void {
        // console.log('token=', this.token);
        this.eventListItems=items;
    }

    @Action( { rawError: true } )
    public [BannerActionType.LIST](): Promise<IBanner[]> {
        return BannerService.getBannerList()
            .then( (data: any)=>{
                this.context.commit( BannerMutationType.UPDATE_LIST, data);
                return Promise.resolve( data );
            }).catch( (error: any)=>{
                return Promise.reject( error );
            } );
    }

    @Action( { rawError: true } )
    public [BannerActionType.DETAIL](bannerSeq:number): Promise<IBanner> {
        return BannerService.getBannerDetail(bannerSeq)
            .then( (data: any)=>{
                this.context.commit( BannerMutationType.UPDATE_DETAIL, data);
                return Promise.resolve( data );
            }).catch( (error: any)=>{
                return Promise.reject( error );
            } );
    }

    @Action( { rawError: true } )
    public [BannerActionType.EVENT_LIST]( query?: string): Promise<IGeneral[]> {
        return BannerService.getEventListByBanner( { query } )
            .then( (data: any)=>{
                this.context.commit( BannerMutationType.UPDATE_EVENT_LIST, data);
                return Promise.resolve( data );
            }).catch( (error: any)=>{
                return Promise.reject( error );
            } );
    }

}

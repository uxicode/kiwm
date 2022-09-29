import { IFilter, ISelectedFilter } from '@/model/filter/IFilter';

export default class FilterService{
    private dataProvider: any[]=[];
    private filterItems: { [key: string]: string | boolean }={};
    private resetItems: { [key: string]: string | boolean }={};

    //select 태그로 선택한 값만 생성할 배열
    private selectedFilterItems: ISelectedFilter[]=[];


    public init(data: any[] ) {
        this.dataProvider=data;
        this.dataProvider.forEach((item, index)=>{
            this.filterItems={ ...this.filterItems, ...{ [item.id]: item.defaultOpt } };
            if( item.defaultOpt!=='all'){
                this.selectedFilterItems.push( { id: item.id, val: item.defaultOpt } );
            }
        });
        // console.log( 'filterItems=', this.filterItems );
        this.resetItems=Object.assign({}, this.filterItems);
    }

    public getFilterItems( type: string ) {
        const findIdx=this.dataProvider.findIndex( (item)=>item.id === type );
        const targetObj= this.dataProvider[findIdx];
        return targetObj.data;
    }

    public getFilterSelectedValue(type: string): string | boolean{
        return this.filterItems[type];
    }

    public updateFilter(payload: { id: string, value: string | boolean }) {

        // console.log( typeof payload.value, payload.value );
        const { id, value }=payload;
        // console.log( 'set filter=', id, value );
        const findIdx=this.dataProvider.findIndex( (item)=>item.id === id );
        const filterDataInfo=this.dataProvider[findIdx];

        // console.log('filterDataInfo=', filterDataInfo );
        const { type }=filterDataInfo;
        //캘린더 타입의 필터 일때
        if (type === 'cal') {
            this.selectedFilter( { id: filterDataInfo.id, val: value } );
        } else {
            this.applyFilter( filterDataInfo.data, id, value );
        }
    }

    private selectedFilter(options: { id: string, val: string | boolean }) {
        const { id, val }=options;
        const findCalIdx=this.getSelectedFilterById( id );
        if (findCalIdx !== -1) {
            this.selectedFilterItems.splice( findCalIdx, 1, { id: id, val } );
        } else {
            this.selectedFilterItems.push( { id: id, val } );
        }
    }

    /**
     * 각각 필터 클릭시 selectedFilterItems 에 선택된 아이템 적용.
     * @param filterItems
     * @param id
     * @param value
     */
    public applyFilter(filterItems: IFilter[], id: string, value: string | boolean) {
        // set filterData
        this.filterItems[id]=value;

        if (value === 'all') {
            //선택한 필터 값 참조 배열 내부값 지우기
            const allFilterFindIdx=this.getSelectedFilterById( id );
            this.selectedFilterItems.splice( allFilterFindIdx, 1 );
        } else {
            // const { val, txt}=this.getFindFilterCode( filterItems, value );
            this.addSelectedFilters( filterItems, id, value );
        }
    }

    public getSelectedFilterById(id: string) {
        return this.selectedFilterItems.findIndex( (item: any)=>item.id === id );
    }

    /**
     * 필터( select 태그 ) 가 선택될 때 마다 참조값들을 바로 반영 시켜준다.
     * @param filterItems
     * @param uid
     * @param value
     */
    public addSelectedFilters(filterItems: IFilter[], uid: string, value: string | boolean) {

        const filterFindIdx=filterItems.findIndex( (item: IFilter)=>item.val === value );
        // console.log('filterFindIdx=', filterFindIdx );
        //
        const { val }=filterItems[filterFindIdx];
        // console.log('filterItems[filterFindIdx]=', filterItems[filterFindIdx], val );

        const findIdx=this.getSelectedFilterById( uid );
        const filter=(findIndex: number, id: string)=>{
            if (findIndex !== -1) {
                this.selectedFilterItems.splice( findIndex, 1, { id, val } );
            } else {
                this.selectedFilterItems.push( { id, val } );
            }
        };
        filter( findIdx, uid );
    }

    public reset() {
        this.selectedFilterItems=[];
        this.filterItems={...this.resetItems};
        // console.log( '초기화된 filter=', this.filterItems );
    }

    public mergeFilter(isSearchValue: boolean, searchResult?: string) {
        let submitFilterInfo: any={};
        this.selectedFilterItems.map((item: ISelectedFilter)=>{
            const insertItem={ [item.id]: item.val };
            submitFilterInfo={ ...submitFilterInfo, ...insertItem };
        });
        if (isSearchValue) {
            submitFilterInfo={ ...submitFilterInfo, query: searchResult };
        }
        return submitFilterInfo;
    }

}

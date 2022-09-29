import { Component, Vue } from 'vue-property-decorator';
import { DataProvider, DataProviderType } from '@/core/data/DataProvider';
import { getMemberBadgeImg, getSnsBadgeImg } from '@/views/utils/userUtils';

@Component
export default class UserMixins extends Vue {

    public dataProvider=new DataProvider();

    public memberStatusItem=this.dataProvider.getItem( DataProviderType.MEMBER_STATUS_TYPE );

    public getGender(gender: string): string {
        return (gender === 'M') ? `남` : `여`;
    }

    /**
     * sns 가입 타입
     * @param type
     */
    public getSnsType(type: string): string {
        // console.log('type=', type );
        /*const imgInfo: any[]=[
            { type: 'G', img: 'icn-24-24-login-google.svg' },
            { type: 'F', img: 'icn-24-24-login-facebook.svg' },
            { type: 'N', img: 'icn-24-24-login-naver.svg' },
            { type: 'K', img: 'icn-24-24-login-kakao.svg' },
        ];
        const findIdx=imgInfo.findIndex( (item)=>item.type === type );*/
        return getSnsBadgeImg( type );////(findIdx !== -1) ? imgInfo[findIdx].img : 'X';
    }

    /**
     * 회원상태 타입 - 활동, 탈퇴 등
     * @param type
     */
    public getUserActivity(type: string): string {
        const findIdx=this.memberStatusItem.findIndex( (item)=>item.val === type );
        return ( findIdx!==-1)? this.memberStatusItem[findIdx].txt : '';
    }


    /*{val: 'LO' , txt: '휴면'},
    {val: 'QU' , txt: '탈퇴'},
    {val: 'FO' , txt: '탈퇴(강제)'},
    {val: 'BL' , txt: '탈퇴(영구)'},*/
    public getWithdrawalStatus(type: string): boolean {
        return type === 'QU' || type === 'FO' || type === 'BL';
    }

    public getRestingStatus(type: string) {
        return type === 'LO';
    }

    /**
     * 회원 등급 이미지 상태 ~
     * @param membership
     */
    public getMembership(membership: string) {
        /*const imgInfo: any[]=[
            { type: 'C01', img: 'icn-24-24-general.svg' },
            { type: 'C02', img: 'icn-24-24-bronze.svg' },
            { type: 'C03', img: 'icn-24-24-silver.svg' },
            { type: 'C04', img: 'icn-24-24-gold.svg' },
            { type: 'C05', img: 'icn-24-24-platinum.svg' },
        ];
        const findIdx=imgInfo.findIndex( (item)=>item.type === membership );
*/
        // console.log( membership, findIdx );
        return getMemberBadgeImg( membership ); /////(findIdx !== -1) ? imgInfo[findIdx].img : imgInfo[0].img;
    }
}

import { request } from '@/restApi';
import {DirectView} from '@/restApi/base';

class DirectViewService {

  // 직관승요 목록
  public static getVictoryList(payload: {
    page?: number,
    checkinVictoryQueryType?: string,
    season?: string,
    query?: string,
  }): Promise<any> {
    return request('get', `${DirectView.BASE_URL}/victory`, payload);
  }

  // 직관 목록
  public static getCheckinList(payload: {
    page?: number,
    checkinQueryType?: string,
    startDateAt?: string,
    endDateAt?: string,
    query?: string,
    memberSeq?: number,
  }): Promise<any> {
    return request('get', `${DirectView.BASE_URL}/checkin`, payload);
  }

  // 직관 상세
  public static getCheckinDetail(checkinSeq: number): Promise<any> {
    return request('get', `${DirectView.BASE_URL}/checkin/${checkinSeq}`);
  }

  // 직관 차단
  public static setCheckinBlock(checkinSeq: number, blockReason: string): Promise<any> {
    return request('put', `${DirectView.BASE_URL}/checkin/${checkinSeq}/block`, {blockReason});
  }

}

export {
  DirectViewService
};

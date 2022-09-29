import { request } from '@/restApi';
import { Game } from '@/restApi/base';


class GameService {

    public static setGameSchedule(): Promise<any> {
        return request( 'get', `${ Game.GAME_KBO }/createGameSchedule`);
    }

}

export {
    GameService
};

import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { AlertMutationTypes } from '@/store/moduleType/AlertMutationTypes';

@Module( {
    namespaced: true,
} )
export default class AlertModule extends VuexModule {

    private serverErrorStatus: boolean=false;
    private notFoundStatus: boolean=false;
    private validAuth: boolean=true;

    get isServerError(): boolean{
        return this.serverErrorStatus;
    }

    get isNotFound(): boolean{
        return this.notFoundStatus;
    }

    get isValidAuth(): boolean{
        return this.validAuth;
    }


    @Mutation
    public [AlertMutationTypes.SERVER_ERROR]( status: boolean): void {
        this.serverErrorStatus=status;
    }

    @Mutation
    public [AlertMutationTypes.NOT_FOUND]( status: boolean): void {
        this.notFoundStatus=status;
    }

    @Mutation
    public [AlertMutationTypes.VALID_AUTH]( status: boolean): void {
        this.validAuth=status;
    }




}

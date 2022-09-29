import { Vue, Component } from 'vue-property-decorator';
import { RouteMeta } from 'vue-router';
import WithRender from './FullType.html';

@WithRender
@Component
export default class FullType extends Vue {
    get cssClass() {
        const meta=this.$route.meta as RouteMeta;
        let addClassName: string='';
        // console.log( meta.renderClass );
        if (meta.renderClass !== undefined) {
            addClassName=meta.renderClass;
        }
        return addClassName;
    }
}

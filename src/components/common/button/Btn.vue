<template>
  <transition>
    <button type="button"
            :id="id"
            class="btn"
            :style="`width:${width}px`"
            :class="[getButtonType(), 'is-ripple', getColor(), getSize(), addClass ]"
            @click.stop="onClick($event)"
            :disabled="disabled">
      <i :class="iconClass" v-if="iconClass!==undefined"></i>
      <slot></slot>
    </button>
  </transition>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class Btn extends Vue{

  @Prop([Number, String])
  public readonly width: number | string | undefined;

  @Prop(String)
  public readonly type: string | undefined; // 'btn' , 'btn-outline'
  
  @Prop(String)
  public readonly color: string | undefined;// 'primary', 'secondary', 'outline-primary', 'outline-secondary', ...

  @Prop(String)
  public readonly size: string | undefined; // 'btn-lg', 'btn-sm'
  
  @Prop([String, Array])
  public readonly addClass!: string | string[];

  @Prop(String)
  public readonly iconClass: string | undefined;

  //부모 태그에서는 -> v-bind 축약형 (:)
  // :disabled="!userMobileState"
  @Prop(Boolean)
  public disabled!: boolean;

  @Prop(String)
  public full!: string;

  @Prop(String)
  public id!: string;

  
  /**
   *
   * @param evt
   */
  public onClick(evt: MouseEvent) {
    // button.classList.add('')
    this.createRipple( evt );
    this.$emit( 'click' );
  }

  /**
   * 버튼 타입 정하기 ( btn-outline 인지 아닌지 )
   */
  public getButtonType(): string{
    let buttonType: string='';
    if(this.type !== undefined){
      buttonType='btn-outline';
    }
    return buttonType;
  }


  /**
   * css class 로 버튼 사이즈 정하기( sm, ss, md, lg, lg-s )
   * size 속성 값이 없다면  default 
   */
  public getSize() {
    let buttonSize: string='';
    if (this.size!==undefined) {
      buttonSize=`btn-${this.size}`;
    }
    return buttonSize;
  }


  /**
   * css class 로 버튼 컬러 정하기
   * color 속성 값이 없다면 primary 로 지정 
   */
  public getColor(): string{
    const btnType=this.getButtonType();
    let btnColor: string='btn-primary';

    if (btnType!=='') {
      if (this.color !== undefined){
        btnColor=`${btnType}-${this.color}`;
      }else{
        btnColor=`${btnType}-primary`;
      }
    }else{
      if (this.color !== undefined){
        btnColor=`btn-${this.color}`;
      }
    }
    return btnColor;
  }
  
  /**
   * 현재 엘리먼트의 위치와 크기를 계산 ( 아래 계산식 위한 함수 )
   * 엘리먼트 화면상 실제 y값=(pageY - offset(엘리먼트).top ) 
   * 엘리먼트 화면상 실제 x값=(pageX - offset(엘리먼트).left ) 
   * @param elem
   */
  public offset(elem: HTMLElement ) {
    const doc = elem && elem.ownerDocument;
    const docElem = doc.documentElement;
    let box: {top:number, left:number}= {top: 0, left: 0};
    
    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    
    return {
      top: box.top + window.pageYOffset - docElem.clientTop,
      left: box.left + window.pageXOffset - docElem.clientLeft
    };
  }

  /**
   * ripple 모션 엘리먼트 만들기 
   * @param event
   */
  public createRipple( event: MouseEvent ) {
    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const pos=this.offset( button );
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.top = `${event.pageY - pos.top - radius}px`;
    circle.style.left = `${event.pageX - pos.left - radius}px`;
    circle.classList.add('ripple-effect');
    button.appendChild(circle);
    //
    //애니메이션이 종료되는 시점에 등록된 ripple-effect' 클래스 가진 엘리먼트를 제거.
    // once 옵션으로 animationend 이벤트 리스너를 한번만 실행되겠끔 한다. ( removeEventListener 안해도 됨 )
    circle.addEventListener('animationend', (e: AnimationEvent ) =>{
      circle.remove();
    }, {once: true});
    
  }


}
</script>

<style scoped>

</style>

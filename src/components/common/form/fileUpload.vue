<template>
  <div class="form-group upload-file" :style="{width: `${width||300}`+'px'}">
<!--    <input class="form-control" :value="fileName" readonly>-->
<!--    <input type="file" :multiple="isMultiple" @change="getFileName($event.target.value)">-->
<!--    <p class="sub-description">* 메인배너 사이즈 : 292*217px / JPG,JPEG,PNG / 최대 1MB</p>-->

    <label :for="inputID" class="form-label" v-if="title!==undefined">{{ title }}</label>
    <input class="form-control" type="file" :id="inputID" :multiple="isMultiple" :accept="acceptType" @change="onChange($event.target.value)">
    <p class="hint" v-if="msg!==undefined">{{msg}}</p>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class FileUpload extends Vue {
  
  @Prop(String)
  private inputID!: string;

  @Prop(String)
  private title!: string;

  @Prop(String)
  private msg!: string;
  
  @Prop(Number)
  private width!: number;
  
  @Prop(Boolean)
  private isMultiple!: boolean;
  
  @Prop(String)
  private acceptType!: string;
  
  private onChange(file: File): void {
    this.$emit( 'upload', file );
  }
  
}
</script>

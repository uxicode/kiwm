interface IFile{
  remove: ( idx: number )=> void;
  load: ( files: FileList, key: string, selector: string )=>void;
  save: ( formData: FormData, saveData?: any )=>void;
  getItem: ()=> any;
}
export { IFile };

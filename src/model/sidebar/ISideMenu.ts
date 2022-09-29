interface IMenu{
  path: string,
  txt: string ,
  icon: string,
  key: string,
  chk: boolean,
}

interface IMenuItems extends IMenu{
  children?: IMenu[];
}

interface IMenuSet{
  tit: string,
  menus:IMenuItems[]
}

export {IMenu, IMenuItems, IMenuSet};

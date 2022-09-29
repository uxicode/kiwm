interface IFilter{
  val: string | boolean;
  txt: string;
}

interface ISelectedFilter{
  id: string;
  val: string | boolean;
  txt?: string;
}

export { IFilter, ISelectedFilter };

/**
 * null 초기화 말고도 undefined 에 대한 초기화
 */
type IMaybe<T> = T | undefined | null;

/**
 * object null 초기화기
 */
type INullable<T> = T | null;

/**
 * promise.all -
 * @param promises
 */
const getAllPromise = <T>( promises: Array< Promise<T>>) => Promise.all(promises);

/**
 * max 값 구하
 * @param items
 */
const getMax=<T>( items: T[] ): T => items.reduce( (a: T, b: T) => a>b? a : b );

/**
 * 배열[오브젝트] 형식에서 원하는 key 의 value 값만 가져와 배열로 반환
 * @param items
 * @param key
 */
const getArrayToValues=<T, K extends keyof T>( items: T[], key: K ): T[K][] => items.map( ( item:T) => item[key] );


type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
type PartialExcept<T, K extends keyof T> = RecursivePartial<T> & Pick<T, K>;

export {IMaybe, INullable, getAllPromise, getMax, getArrayToValues, PartialExcept};

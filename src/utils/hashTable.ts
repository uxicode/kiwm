/**
 * @example
  var hash=new Utils.HashTable();
 hash.put('Gandalf', 'gandalf@email.com');
 hash.getItem('Gandalf');
 */
export default class HashTable {

  private table: any[] = [];
  
  public put(key: string, value: string) {
    const position = this.djb2HashCode(key);
    this.table[position] = value;
    //console.log(position + '-' + key);
  }
  public getItem(key: string) {
    return this.table[this.djb2HashCode(key)];
  }
  public remove(key: string) {
    this.table[this.djb2HashCode(key)] = undefined;
  }
  public print() {
    for (let i = 0; i < this.table.length; ++i) {
      if (this.table[i] !== undefined) {
        console.log(i + ": " + this.table[i]);
      }
    }
  }
  //해시함수 개선한 djb2
  public djb2HashCode(key: string) {
    //임의의 소수로 초기화 - 가장 많이 쓰는 숫자가 5381
    let hash = 5381; 
    
    // hash 변수에 33 곱하고 (매직넘버) 각 문자의 아스키 값과 더한다.
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    //hash 를 다시 또 다른 임의의 소수로 나눈다.
    //(HashTable 인스턴스가 가질 수 있는 크기보다 더 큰수. 여기서는 그 크기를 1000 으로 잡았다 )
    return hash % 1023;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CachedResultService {
  private cache = new Map<string, any>();

  constructor() {}
  getData(generation: string): any {
    if (this.cache.has(generation)) {
      return (this.cache.get(generation) );
    }
    return undefined
  }

  setData(generation:string, response:any){
    this.cache.set(generation,response)
  }

}

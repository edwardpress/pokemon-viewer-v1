import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CachedResultService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}
  getData(generation: string): any {
    if (this.cache.has(generation)) {
      return (this.cache.get(generation) );
    }
    return false
  }

  setData(generation:string, response:any){
    this.cache.set(generation,response)
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coordinates } from 'src/app/interfaces/coordinates';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  apiKey: string = '0tdD14LlwdNgT2jgnPgDNw==YZeJL5q0wUaWHMem';
  headers = new HttpHeaders({ 'X-Api-Key': this.apiKey});
  requestOptions = { headers: this.headers };

  getCoordinates( city: string ): Observable<Coordinates[]>{
    return this.http.get<Coordinates[]>(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, this.requestOptions)
  }
}

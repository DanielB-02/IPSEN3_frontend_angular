import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '../model/platform/platform';
import {map, Observable} from "rxjs";
import {environment} from "../environments/environment";

const BASIC_URL = environment['BASIC_URL'];

@Injectable()
export class PlatformService {

  private platformsUrl: string;


  constructor(private http: HttpClient) {
    this.platformsUrl = BASIC_URL + 'platform';
  }

  public findAll(): Observable<Platform[]> {
    return this.http.get<Platform[]>(this.platformsUrl + '/sorted');
  }

  public save(platform: Platform) {
    return this.http.post<Platform>(this.platformsUrl, platform);
  }

  public findByScoreAsc(): Observable<Platform[]>{
    return this.http.get<Platform[]>(this.platformsUrl + '/sorted')
      .pipe(
        map(platforms => platforms.slice(0, 10))
      );
  }


  public findByScoreDesc(): Observable<Platform[]> {
    return this.http.get<Platform[]>(this.platformsUrl + '/sortedDesc')
      .pipe(
        map(platforms => platforms.slice(0, 5))
      );
  }
  public find(id: string): Observable<Platform> {
      return this.http.get<Platform>(`${this.platformsUrl}/${id}`);
  }

  /*public showScoresOfAllPlatforms(): Observable<Platform[]> {
      return this.http.get<Platform[]>(this.platformsUrl + '/scoresAllPlatforms')
          .pipe(
              map(platforms => platforms)
          );
  }*/

}

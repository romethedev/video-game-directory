import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }   // be sure to inject the http client into your constructor, which will be the dependency to communicate with our backend

  
  getGameList(          // first method is getgamelist which is the method we call from our homecomponent to get a list of the games
    ordering: string,   // this method receives two arguments: ordering and search
    search?: string,
  ): Observable<APIResponse<Game>> {    //this method returns observable apiresponse game
    let params = new HttpParams().set('ordering', ordering);    //default parameters for our method will be ordering

    if (search) {       //if a user is typing into the search box we want to append the search parameters as well
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {     //be sure to return the get method which wil return the api response, the base url of our service is going to be created inside the environment.ts & environment.prod.ts file, adn the route for this call is going to be /games
      params: params,   //setting the parameters of params
    });    
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    )
  }
}


//in order to consume our api its not enough to set the url we need, it requires some of the parameters and headers to be attached to our request, so in order to do that we instead of setting the parameters and headers through every request we will use do that on the application-level by using Interceptors
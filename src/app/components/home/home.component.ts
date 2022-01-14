import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string;
  public games: Array<Game> = [];
  public originalGameList: Array<Game> = [];
  public filterResults: Array<Game> = [];
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {    //we want to check is there any game search queries in our url if there is then call the search games method
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string) {
    // var originalGameList = [];
    this.gameSub = this.httpService 
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.originalGameList = gameList.results;
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  filterGames() {
    // var filterResults = [];
    for (var i in this.games) {
      // console.log(this.games[i].metacritic);

      if(this.games[i].metacritic >= 90) {
        // console.log(this.games[i].name, ' is a good game');
        // console.log(this.games[i]);
        this.filterResults.push(this.games[i]);
        // filterResults.push([i]);
        
      }
    }
    console.log(this.filterResults);
    this.games = this.filterResults;
  }

  ratedMature() {
    // var filterResults = [];
    for (var i in this.games) {
      // console.log(this.games[i].esrb_rating.name);
      if(this.games[i].esrb_rating.name == 'Mature') {
        // console.log(this.games[i].name, ' is a Mature game');
        // console.log(this.games[i]);
        this.filterResults.push(this.games[i]);
        
      }
    }
    console.log(this.filterResults);
    this.games = this.filterResults;
  }

  ratedTeen() {
    // var filterResults = [];
    for (var i in this.games) {
      // console.log(this.games[i].esrb_rating.name);
      if(this.games[i].esrb_rating.name == 'Teen') {
        // console.log(this.games[i].name, ' is a Mature game');
        // console.log(this.games[i]);
        this.filterResults.push(this.games[i]);
        
      }
    }
    console.log(this.filterResults);
    this.games = this.filterResults;
  }

  ratedEveryone() {
    // var filterResults = [];
    for (var i in this.games) {
      // console.log(this.games[i].esrb_rating.name);
      if(this.games[i].esrb_rating.name == 'Everyone 10+') {
        // console.log(this.games[i].name, ' is a Mature game');
        // console.log(this.games[i]);
        this.filterResults.push(this.games[i]);
        
      }
    }
    console.log(this.filterResults);
    this.games = this.filterResults;
  }

  resetFilters() {
    // console.log(this.games);
    // console.log(this.originalGameList);
    this.games = this.originalGameList;
    this.filterResults = [];
  }

  openGameDetails(id: string): void {     //we're not returning anything when we click on the games but we'll call this.router which is the private router we injected into our constructor, and we'll navigate to the details page and send in id as the parameter so the url will be localhost/details/id of the game clicked
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();   //so if there is a subscription existing, unsubscribe when the page is closed
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();    //if there is an existing route unsubscribe when the page closes
    }
  }

}

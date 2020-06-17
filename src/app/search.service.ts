import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, observable, of, empty } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  public searchResults: any;

  constructor(private httpClient: HttpClient) { }


  // viene fatta una richiesta HTTP per ottenere i risultati e ritorna come response un observable  
  public searchEntries(term): Observable<any>{
    if (term === "" ){
      console.log("Not defined");
      return of(null);
      
    }else{
      return this.httpClient.get(this.baseUrl + term +"&maxResults=40").pipe(
        // nonostante siano presenti più libri, il numero massimo di libri per richiesta consentiti da Google è 40.
        // se andassimo ad inserire ad esempio 41, la richiesta non andrebbe a buon fine
        map(response => {
          console.log(response)
          return this.searchResults = response["items"];
        })
      );
    }
    
  }

  // ritorna la response del primo metodo
  public _searchEntries(term){
    return this.searchEntries(term);
  }
}

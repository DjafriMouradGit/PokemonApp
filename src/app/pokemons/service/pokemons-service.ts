import { Injectable } from '@angular/core';
import { Pokemon} from '../model/pokemon.model';
import { POKEMONS} from '../model/mock-pokemons';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import {error} from 'util';

@Injectable()
export class PokemonsService {

  constructor(private http: HttpClient) {}

  private pokemonUrl = 'api/pokemons';

  private log(log: string){
    console.log(log);
  }

  private handleError<T>(operation = 'operation',result?:T){
    return(error: any ): Observable<T>=>{
      console.log(error);
      console.log(`${operation} failed: ${error.message}` );
      return of(result as T);
    };
  }

  // Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonUrl).pipe(
      tap(_ => this.log(`fetched pokemons`)),
      catchError(this.handleError(`getPokemons`,[]))
    );
  }

  // mis à jour d'un pokemon
  updatePokemons(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.pokemonUrl, pokemon, httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
        catchError(this.handleError<any>('updatedPokemon'))
    );
  }

 // supprimer un pokemon
  deletePokemon(pokemon: Pokemon): Observable<Pokemon>{
    const url = `${this.pokemonUrl}/${pokemon.id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.delete<Pokemon>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id=${pokemon.id}`)),
      catchError(this.handleError<Pokemon>('deletedPokemon'))
    );
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre

  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonUrl}/${id}`; // syntaxe ES6
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id=${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon id={id}`))
    );
  }

  // rechercher selon un mot clé
  searchPokemons(term: string): Observable<Pokemon[]>{
       if (!term.trim()){
         return of([]);
       }
       return this.http.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
         tap(_ => this.log(`found pokemons matching "${term}"`)),
         catchError(this.handleError<Pokemon[]>(`searchPokemons,[]`))
       );
  }


  getPokemonTypes():string[] {
    return ['Plante','Feu','Eau','Insecte','Normal','Electrik','Poison','Fée','Vol']
  }
}

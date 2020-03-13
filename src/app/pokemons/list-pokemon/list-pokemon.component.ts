import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../model/pokemon.model';
import {Router} from '@angular/router';
import {PokemonsService} from '../service/pokemons-service';

@Component({
  selector: 'list-pokemon',
  templateUrl: 'list-pokemon.component.html'
})
export class ListPokemonComponent implements OnInit{
  private pokemons: Pokemon[] = null;
  title:string = "Pokémons";

  constructor(private router: Router,
              private pokemonsService: PokemonsService) {
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
     this.pokemonsService.getPokemons()
       .subscribe(pokemons => this.pokemons = pokemons);
  }

  selectPokemon(pokemon: Pokemon) {
    console.log('Vous avez selectionné ' + pokemon.name);
    let link=['/pokemon',pokemon.id];
    this.router.navigate(link);
  }
}


import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Pokemon} from '../../model/pokemon.model';
import {PokemonsService} from '../../service/pokemons-service';

@Component({
  selector: 'edit-pokemon',
  template: `

    <h2 class="header center">Editer {{ pokemon?.name }}</h2> <!--    pokemon.name != null ? pokemon.name: null-->
    <p class="center">
      <img *ngIf="pokemon" [src]="pokemon.picture"/>
    </p>
    <pokemon-form [pokemon]="pokemon"></pokemon-form>
  `,
})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonsService) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

}

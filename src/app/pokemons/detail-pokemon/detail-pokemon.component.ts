import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon} from '../model/pokemon.model';
import {PokemonsService} from '../service/pokemons-service';

@Component({
  selector: 'detail-pokemon',
  templateUrl: 'detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {
  pokemon: Pokemon = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pokemonsService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }

  delete(pokemon: Pokemon): void{
    this.pokemonsService.deletePokemon(pokemon)
      .subscribe(__ => this.goBack());
  }

  goBack(): void {
    this.router.navigate(['/pokemon/all']);

    // window.history.back();
  }

  goEdit(pokemon: Pokemon) {
    let link=['pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }
}

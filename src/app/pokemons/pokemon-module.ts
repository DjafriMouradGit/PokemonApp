import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { ListPokemonComponent} from './list-pokemon/list-pokemon.component';
import { DetailPokemonComponent} from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent} from './forms/pokemon-form/edit-pokemon.component';
import { PokemonFormComponent} from './forms/pokemon-form/pokemon-form.component';
import { PokemonSearchComponent} from './search/search-pokemon.component';
import { LoaderComponent } from '../loader.component';

import { PokemonRoutingModule } from './pokemons-routing.module';
import { BorderCardDirective} from './directive/Border-card-directive';
import { PokemonTypeColorPipe} from './pipe/pokemon-type-color.pipe';
import { PokemonsService} from './service/pokemons-service';
import {AuthGuard} from '../auth-guard.service';

@NgModule({
  imports: [
    //l'ordre est important
    CommonModule,
    FormsModule,
    PokemonRoutingModule,
  ],
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    EditPokemonComponent,
    PokemonFormComponent,
    PokemonSearchComponent,
    LoaderComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
  ],
  exports: [
  ],
  providers: [PokemonsService, AuthGuard]
})
export class PokemonsModule { }

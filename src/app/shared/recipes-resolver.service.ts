import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { DataStorageService } from './data-storage.service';
import { Recipe } from './recipes.model';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length) {
      return recipes;
    } else {
      return this.dataStorageService.fetchRecipes();
    }
  }
}

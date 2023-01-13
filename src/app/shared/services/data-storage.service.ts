import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../model/recipes.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private baseUrl =
    'https://ng-complete-guide-15ad5-default-rtdb.asia-southeast1.firebasedatabase.app/';
  private recipeUrl = 'recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.baseUrl + this.recipeUrl, recipes).subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl + this.recipeUrl).pipe(
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}

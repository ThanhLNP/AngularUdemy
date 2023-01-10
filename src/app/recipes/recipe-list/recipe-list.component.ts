import { Component } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  constructor(private recipeService: RecipeService) {}

  recipes: Recipe[] = this.recipeService.getRecipes();

  onCreateRecipe() {}
}

import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../shared/recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [RecipeService],
})
export class RecipesComponent {
  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeSelected.subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  selectedRecipe!: Recipe;
}

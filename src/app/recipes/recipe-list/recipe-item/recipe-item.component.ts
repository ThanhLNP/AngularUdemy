import { Component, Input } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent {
  constructor(private recipeService: RecipeService) {}

  @Input() recipe!: Recipe;

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}

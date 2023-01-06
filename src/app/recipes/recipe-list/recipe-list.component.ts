import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'test name',
      'test description',
      'https://us-tuna-sounds-images.voicemod.net/34e4a9df-db1b-4a42-b63c-63cc7f674ff4-1659604548424.jpg'
    ),
    new Recipe(
      'test name A',
      'test description',
      'https://us-tuna-sounds-images.voicemod.net/34e4a9df-db1b-4a42-b63c-63cc7f674ff4-1659604548424.jpg'
    ),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}

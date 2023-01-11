import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from '../shared/recipes.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'test name',
      'test description',
      'https://us-tuna-sounds-images.voicemod.net/34e4a9df-db1b-4a42-b63c-63cc7f674ff4-1659604548424.jpg',
      [new Ingredient('Apple', 5)]
    ),
    new Recipe(
      'test name A',
      'test description',
      'https://us-tuna-sounds-images.voicemod.net/34e4a9df-db1b-4a42-b63c-63cc7f674ff4-1659604548424.jpg',
      [new Ingredient('Apple', 5)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredient(ingredients: Ingredient[]) {}
}

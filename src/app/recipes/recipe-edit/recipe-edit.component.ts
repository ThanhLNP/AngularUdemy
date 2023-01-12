import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id: number | null = null;
  recipeForm!: FormGroup;
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.initForm();
    });
  }

  private initIngredientFormGroup(
    name: string | null = null,
    amount: number | null = null
  ) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  private initForm() {
    let name;
    let description;
    let imagePath;
    let ingredients = new FormArray<FormGroup>([]);

    if (this.id) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;

      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(
          this.initIngredientFormGroup(ingredient.name, ingredient.amount)
        );
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: ingredients,
    });
  }

  onSubmit(): void {
    if (this.id) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.initIngredientFormGroup()
    );
  }

  onCancel() {
    this.router.navigate(['../']);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}

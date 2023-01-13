import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../component/auth/auth.component';
import { RecipeDetailComponent } from '../component/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../component/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../component/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../component/recipes/recipes.component';
import { ShoppingListComponent } from '../component/shopping-list/shopping-list.component';
import { RecipesResolverService } from '../shared/services/recipes-resolver.service';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

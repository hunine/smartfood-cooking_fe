import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
        { path: 'ingredient', loadChildren: () => import('./ingredient/ingredient.module').then(m => m.IngredientModule) },
        { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
        { path: 'cuisine', loadChildren: () => import('./cuisine/cuisine.module').then(m => m.CuisineModule) },
        { path: 'level', loadChildren: () => import('./level/level.module').then(m => m.LevelModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

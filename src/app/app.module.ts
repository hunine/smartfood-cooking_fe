import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RecipeService } from './service/recipe.service';
import { IngredientService } from './service/ingredient.service';
import { CategoryService } from './service/category.service';
import { CuisineService } from './service/cuisine.service';
import { LevelService } from './service/level.service';
import { HttpService } from './service/http.service';
import { CustomPrimengModule } from './_shared/primeng.module';
import { UserService } from './service/user.service';
import { CookingHistoryService } from './service/cooking-history.service';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [AppRoutingModule, AppLayoutModule, CustomPrimengModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    HttpService,
    RecipeService,
    IngredientService,
    CategoryService,
    CuisineService,
    LevelService,
    UserService,
    CookingHistoryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

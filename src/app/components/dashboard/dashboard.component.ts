import { max } from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountIngredients } from 'src/app/api/ingredient';
import { CountRecipes, Recipe } from 'src/app/api/recipe';
import { CountUsers } from 'src/app/api/user';
import { IQuery } from 'src/app/common/interfaces/interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CookingHistoryService } from 'src/app/service/cooking-history.service';
import { IngredientService } from 'src/app/service/ingredient.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  recipes: Recipe[] = [];

  countRecipes: CountRecipes = {
    totalRecipes: 0,
    newRecipesLastWeek: 0,
  };

  countIngredients: CountIngredients = {
    totalIngredients: 0,
    newIngredientsLastWeek: 0,
  };

  countUsers: CountUsers = {
    totalUsers: 0,
    newUsersLastWeek: 0,
  };

  params: IQuery = {
    page: 1,
    limit: 5,
    sortBy: 'rating:DESC',
  };

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private userService: UserService,
    private cookingHistoryService: CookingHistoryService,
    public layoutService: LayoutService
  ) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
      this.initChart();
    });
  }

  private async getCountRecipe() {
    const response = await this.recipeService.countRecipes();
    this.countRecipes = response.data;
  }

  private async getCountIngredient() {
    const response = await this.ingredientService.countIngredients();
    this.countIngredients = response.data;
  }

  private async getCountUser() {
    const response = await this.userService.countUsers();
    this.countUsers = response.data;
  }

  async ngOnInit() {
    await this.initChart();
    await this.getCountData();
    await this.reloadTableBestRecipes();
  }

  async initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const responseData: any =
      await this.cookingHistoryService.getRecipeStatistic(
        '2023-06-22',
        '2023-06-29'
      );
    const labels: string[] = [];
    const data: number[] = [];
    responseData.data.forEach((item: any) => {
      labels.push(item.date);
      data.push(item.count);
    });
    const maxValueInChart = max(data) || 5;
    const minimumDivision = 5;

    this.chartData = {
      labels,
      datasets: [
        {
          data,
          label: 'Recipes',
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--primary-color'),
          borderColor: documentStyle.getPropertyValue('--primary-color'),
          tension: 0.2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
          position: 'bottom',
          padding: 50
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            beginAtZero: true,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: maxValueInChart,
          ticks: {
            color: textColorSecondary,
            stepSize: maxValueInChart / minimumDivision,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async getCountData() {
    await this.getCountRecipe();
    await this.getCountIngredient();
    await this.getCountUser();
  }

  async reloadTableBestRecipes() {
    const returnData: any = await this.recipeService.getRecipes(this.params);
    this.recipes = returnData.data as Recipe[];
  }
}

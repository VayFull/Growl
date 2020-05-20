import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Observable<WeatherForecast[]>;

  constructor(http: HttpClient) {
    this.forecasts = http.get<WeatherForecast[]>("https://growl.azurewebsites.net/" + 'weatherforecast');
  };
}

interface WeatherForecast {
  city: string;
  forecast: number;
  date: string;
}

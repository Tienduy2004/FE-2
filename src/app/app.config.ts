import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {bootstrapApplication, provideClientHydration} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(HttpClientModule),CookieService]
};
// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(HttpClientModule),
//   ]
// });

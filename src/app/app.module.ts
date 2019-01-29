import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZone } from '@angular/core';
import { AppComponent } from './app.component';
import { DataService } from './services/salesforce-data-service';
import { OfficeDataService } from './services/office-data-service';
import { OAuthService } from './services/salesforce-oauth-service';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Result } from './classes/oauth/result';
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { Event } from './classes/event'
=======
>>>>>>> 6cc122133a9bc035d1dd31e718524898ba6fe357

///

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    OfficeDataService,
    OAuthService,
    Result,
<<<<<<< HEAD
    Event,
=======
>>>>>>> 6cc122133a9bc035d1dd31e718524898ba6fe357
    [{ provide: APP_BASE_HREF, useValue: environment.baseURL }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

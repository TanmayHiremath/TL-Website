import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { EventsComponent } from './events/events.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { OwlModule } from 'ngx-owl-carousel'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    EventsComponent,
    InventoryComponent,
    ContactComponent,
    HomeComponent,
  ],
  imports: [
      FormsModule,
      BrowserModule,
      RouterModule,
      HttpClientModule,
      ReactiveFormsModule,
      OwlModule,
      BrowserAnimationsModule,
      CarouselModule ,

      ///////////////////////////////////////////////////////
      RouterModule.forRoot([

          {path:'home',component:HomeComponent},
          
          {path:'about',component:AboutComponent},
          {path:'events',component:EventsComponent},
          {path:'inventory',component:InventoryComponent},
          {path:'contact',component:ContactComponent},
          { path:'**',   redirectTo: '/home' }, 

      ]),
      ///////////////////////////////////////////////////////
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

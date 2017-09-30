import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // <-- import the FormsModule before binding with [(ngModel)]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

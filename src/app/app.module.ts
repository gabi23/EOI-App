import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { EditComponent } from './pages/edit/edit.component';
import {MatCardModule} from '@angular/material/card';
import { FormComponent } from './components/form/form.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UsersComponent,
    HomeComponent,
    UserComponent,
    RegisterComponent,
    DialogComponent,
    EditComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

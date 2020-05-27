import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { TablePostsComponent } from './shared/components/table-posts/table-posts.component';
import { TableCommentsComponent } from './shared/components/table-comments/table-comments.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { GalleryComponent } from './shared/components/gallery/gallery.component';
import { EditorComponent } from './shared/components/editor/editor.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { searchReducer } from './reducers/search/search.reducer';
import { SearchComponent } from './shared/components/search/search.component';
import { userPageReducer } from './reducers/userPage/user-page.reducer';
import { postPageReducer } from './reducers/postPage/post-page.reducer';
import { CommentsListComponent } from './shared/components/comments-list/comments-list.component';
import { ToolbarCommentsComponent } from './shared/components/toolbar-comments/toolbar-comments.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    UserPageComponent,
    PostPageComponent,
    HomePageComponent,
    TablePostsComponent,
    TableCommentsComponent,
    ToolbarComponent,
    GalleryComponent,
    EditorComponent,
    SearchComponent,
    CommentsListComponent,
    ToolbarCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    StoreModule.forRoot({
      search: searchReducer,
      userPage: userPageReducer,
      postPage: postPageReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

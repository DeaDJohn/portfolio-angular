import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule } from '@angular/material';


@NgModule({
    imports: [FormsModule, ReactiveFormsModule,BrowserAnimationsModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule],
    exports: [FormsModule, ReactiveFormsModule,BrowserAnimationsModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule],
})
export class MaterialModule { }
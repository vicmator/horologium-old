import { NgModule } from '@angular/core';
// Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
  ],
  declarations: [],
})
export class MaterialModule { }

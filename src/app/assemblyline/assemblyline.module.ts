import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssemblyLineComponent } from './assemblyline.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssemblyLineComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [AssemblyLineComponent],
})
export class AssemblyLineModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthRoutingModule } from 'src/app/route/auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}

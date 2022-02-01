import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUser from './user.reducer';
import { UserEffects } from './user.effects';

@NgModule({
    imports: [
        CommonModule,
        // Store init
        StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
        EffectsModule.forFeature([UserEffects])
    ]
})
export class UserStoreModule { }

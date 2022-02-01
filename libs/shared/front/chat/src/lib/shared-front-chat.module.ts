import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { UserlistComponent } from './components/chat/userlist/userlist.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule, MaterialModule } from '@mslibs/front-share';
import { UserStoreModule } from '@mslibs/ms-user';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  { path: 'chat', component: ChatComponent },

];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserStoreModule,
    RouterModule.forChild(routes)
  ],
  declarations:[
    ChatComponent,
    MessageComponent,
    UserlistComponent
  ]
})
export class SharedFrontChatModule {}

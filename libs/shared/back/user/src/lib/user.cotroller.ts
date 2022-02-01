import { Controller, Get, Post, Body, UseGuards, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './user.decorator';

import { UserUpdateDto , UserCreateDto} from '@mslibs/shared/front-back/user/dtos';

@Controller()
export class UserController {
  constructor(private userService: UserService) { }

  /* register */
  @Post('user')
  async addUser(@Body() user: UserCreateDto) {
    return this.userService.create(user);
  }

  /* get current user */
  @UseGuards(AuthGuard('jwt'))
  @Get('currentUser')
  async getCurrentUser(@CurrentUser() cuser: UserUpdateDto) {
    return this.userService.findOne(cuser.id);
  }

  /* update current user */
  @UseGuards(AuthGuard('jwt'))
  @Put('currentUser')
  async updateCurrentUser(@Body() user: UserUpdateDto, @CurrentUser() cuser: UserUpdateDto) {
    return this.userService.udpateCurrentUser(user, cuser.id);
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('user/:name')
  // async getItemByName(@Param() params) {
  //   return this.userService.findOne(params.name);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('users')
  // async getData() {
  //   return this.userService.findAll();
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('users/find')
  // async find(@Query() query) {
  //   return this.userService.find(query);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Put('user')
  // async updateUser(@Body() user: UserBase) {
  //   return this.userService.udpate(user);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('users')
  // async addUsers(@Body() users: UserBaseDto[]) {
  //   return this.userService.createManyUsers(users);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Delete('users/:id')
  // async removeUserById(@Param() params) {
  //   return this.userService.removeById(params.id);
  // }

}

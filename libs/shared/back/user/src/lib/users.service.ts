import { Injectable } from '@nestjs/common';
import { JwtUserPayload } from '@mslibs/shared/front-back/auth/dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument } from '@mslibs/shared/front-back/user/models';
import { UserUpdateDto,UserCreateDto, MsProvider } from '@mslibs/shared/front-back/user/dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) { }

  async create(createUserDto: UserCreateDto): Promise<UserUpdateDto> {
    // @ts-ignore
    const { _id, ...cnadidateCollectionNoId } = createUserDto;
    const createdUser = new this.userModel(cnadidateCollectionNoId);
    return await createdUser.save();
  }

  async findOne(id: string): Promise<UserUpdateDto> {
      return await this.userModel.findOne({ _id: id }).exec();
  }

  async udpateCurrentUser(user: UserUpdateDto, userId: string): Promise<UserUpdateDto> {
    const updateOptions =  {  upsert : true, new: true };
    const updateduser = await this.userModel.findByIdAndUpdate(userId, user,updateOptions, function(err,doc){});
    return updateduser;
  }

  async findOneByThirdPartyId(_thirdPartyId: string, _provider: string): Promise<UserUpdateDto> {
    return await this.userModel.findOne({ thirdPartyId: _thirdPartyId, provider : _provider }).exec();
  }

  async registerOAuthUser(thirdPartyProfile: any,provider : string): Promise<UserUpdateDto> {
    //if thirdPartyProfile.provider == google
    let createUserDto = null;
    if(provider === MsProvider.GOOGLE){
      createUserDto  = {
        username : thirdPartyProfile.displayName,
        firstName:  thirdPartyProfile.name.givenName,
        lastName : thirdPartyProfile.name.familyName,
        photoUrl: thirdPartyProfile._json.picture,
        provider: provider, 
        thirdPartyId : thirdPartyProfile.id,
        locale: thirdPartyProfile.locale,
        email:  thirdPartyProfile!.emails?.shift().value
      };
    }else if( provider === MsProvider.FACEBOOK){
      createUserDto  = {
        username : thirdPartyProfile.displayName,
        firstName:  thirdPartyProfile.name.givenName,
        lastName : thirdPartyProfile.name.familyName,
       // photoUrl: thirdPartyProfile!.photos[0]!.value,
        provider: provider, 
        thirdPartyId : thirdPartyProfile.id,
       // email: thirdPartyProfile!.emails[0]!.value
      };
    }
    if(createUserDto){
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    }else{
      return null;
    }
  }

  async checkLogin(email: string, password: string): Promise<JwtUserPayload> {
    // https://github.com/Automattic/mongoose/issues/8119
    // @ts-ignore
    return await this.userModel.getAuthenticated(email, password, 
      async function (err, user, reason) {
      console.log('checkLogin reason',reason,err,user);
      if (err) { 
        throw err;
      } 
      // login was successful if we have a user
      if (user) {
        // handle login success
        return {provider : user.provider , id : user._id} as JwtUserPayload;
      }
      // otherwise we can determine why we failed
     // var reasons = FaildLoginReasons;
     
      switch (reason) {
        case 'NOT_FOUND':
        case 'PASSWORD_INCORRECT':
          // note: these cases are usually treated the same - don't tell
          // the user *why* the login failed, only that it did
          break;
        case 'MAX_ATTEMPTS':
          // temporarily locked
          break;
      }
      return null;
    });
  }



  // async udpate(updateUser: User): Promise<User> {
  //   const updatedDuser = await this.userModel.findByIdAndUpdate(updateUser.id, updateUser, { new: true });
  //   return updatedDuser;
  // }

  // async findAll(): Promise<User[]> {
  //   return await this.userModel.find().exec();
  // }

  // async find(query: any): Promise<User[]> {
  //   return await this.userModel.find(query).exec();
  // }

  // async createManyUsers(users: UserDto[]): Promise<any> {
  //   return await this.userModel.create(users);
  // }

  // async removeById(id: string): Promise<any> {
  //   return await this.userModel.findOneAndDelete({ _id: id }).exec();
  // }

}

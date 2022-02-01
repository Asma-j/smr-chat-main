import { Prop, Schema , SchemaFactory} from '@nestjs/mongoose';
import {MsProvider} from '@mslibs/shared/front-back/user/dtos'
import * as bcrypt from 'bcryptjs';

export type UserDocument = UserBase & Document;

@Schema()
export class UserBase{
    @Prop() username: string;
    @Prop() email: string;
    @Prop() password: string;
    @Prop() provider: string;
    @Prop() firstName: string;
    @Prop() lastName: string;
    @Prop() thirdPartyId: string;
    @Prop() photoUrl: string;
    @Prop() local: string;
    @Prop() mobileTel: string;
    @Prop(Date) created_at: Date;
    @Prop(Date) updated_at: Date;
}

export const UserBaseSchema = SchemaFactory.createForClass(UserBase);

//Hide User, password, loginAttempts, isLocked
UserBaseSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    delete obj.loginAttempts;
    delete obj.isLocked;
    return obj;
  }
  
  // https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
  export const SALT_WORK_FACTOR = 10;
  // these values can be whatever you want - we're defaulting to a
  // max of 5 attempts, resulting in a 5 mn lock
  export const MAX_LOGIN_ATTEMPTS = 5;
  export const LOCK_TIME = 5 * 60 * 1000;
  
  /* pre-save user to hash-password */
  UserBaseSchema.pre<UserDocument>("save", function (next) {
    const user = this;
    console.log('Pre save user hash password', user);
    if (!user.isModified('password')) return next();
    // generate a salt
    if(user.provider === MsProvider.LOCAL){
      bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
        });
      });
    }else{
      // auth by an external oauth provider
      return next();
    }
  });
  
  UserBaseSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
  
  UserBaseSchema.statics.getAuthenticated = async function (email, password, cb) {
    const condidateUser = await this.findOne({ email: email });
    // check exist user
    if (condidateUser) {
      if (condidateUser.isLocked) {
        // just increment login attempts if account is already locked
        return cb(null, null, FaildLoginReasons.MAX_ATTEMPTS);
      }
      // test for a matching password
      const isPassmatch = await condidateUser.comparePassword(password);
      if (isPassmatch) {
        //console.log('UserBaseSchema.statics.getAuthenticated - success login',condidateUser);
        //success login
        return cb(null, condidateUser);
      } else {
        // incorrect password
        return cb(null, null, FaildLoginReasons.NOT_FOUND);
      }
    } else {
      //not found user
      return cb(null);
    }
  };
  
  /* TO-complete track login faild */
  UserBaseSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
  };
  
  UserBaseSchema.virtual('isLocked').get(function () {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
  });
  
  // expose enum on the model, and provide an internal convenience reference 
  export const FaildLoginReasons = UserBaseSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
  };
  
  //   // Duplicate the ID field.// has id instead of _id for ngrx data entity
//   UserBaseSchema.virtual('id').get(function () {
//     return this._id.toHexString();
//   });
//   // Ensure virtual fields are serialised.
//   UserBaseSchema.set('toJSON', {
//     virtuals: true
//   });
  
  
  // UserBaseSchema.methods.incLoginAttempts = async function (cb) {
  //   return cb(null);
  //   //TODO
  //   // if we have a previous lock that has expired, restart at 1
  //   console.log('UserBaseSchema.methodsincLoginAttempts', this.lockUntil);
  //   if (this.lockUntil && this.lockUntil < Date.now()) {
  //     return await this.updateOne({
  //       $set: { loginAttempts: 1 },
  //       $unset: { lockUntil: 1 }
  //     }, cb).exec();
  //   }
  //   // otherwise we're incrementing
  //   var updates = { $inc: { loginAttempts: 1 } };
  //   // lock the account if we've reached max attempts and it's not locked already
  //   if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
  //     updates['$set'] = { lockUntil: Date.now() + LOCK_TIME };
  //   }
  //   console.log('Return UserBaseSchema.methodsincLoginAttempts updates', updates);
  //   const updateUser = await this.updateOne(updates, cb).exec();
  //   if (updateUser) {
  //     console.log('UserBaseSchema.methodsincLoginAttempts updateUser ', updates);
  //     return cb(null);
  //   } else {
  //     return cb(null);
  //   }
  //   // return cb(null);
  // };
  
        // return await this.findOne({ username: username }, function (err, user) {
        //   if (err) return cb(err);
        //   console.log('getAuthenticated user is found');
        //   // make sure the user exists
        //   if (!user) {
        //     console.log('getAuthenticated not found user');
  
        //   }
        //   // check if the account is currently locked
        //   if (user.isLocked) {
        //     // just increment login attempts if account is already locked
        //     console.log('getAuthenticated isLocked');
        //     return cb(null, null, FaildLoginReasons.MAX_ATTEMPTS);
        //     //   return await user.incLoginAttempts(function(err, res) {
        //     //   console.log('incLoginAttempts resp',res);
        //     //     if (err) return cb(err);
        //     //   return cb(null, null, FaildLoginReasons.PASSWORD_INCORRECT);
        //     // });
        //   }
        //   // test for a matching password
        //   return user.comparePassword(password, async function (err, isMatch) {
        //     if (err) return cb(err);
        //     // check if the password was a match
        //     console.log('getAuthenticated comparePassword', isMatch);
        //     if (isMatch) {
        //       // if there's no lock or failed attempts, just return the user
        //       //if (!user.loginAttempts && !user.lockUntil) 
        //       return cb(null, user);
        //       // reset attempts and lock info
        //       //TODO
        //       // var updates = {
        //       //   $set: { loginAttempts: 0 },
        //       //   $unset: { lockUntil: 1 }
        //       // };
        //       // return user.updateOne(updates, function (err) {
        //       //   if (err) return cb(err);
        //       //   return cb(null, user);
        //       // }).exec();
        //     }else{
        //       return cb(null, null, FaildLoginReasons.PASSWORD_INCORRECT);
        //     }
        //     // password is incorrect, so increment login attempts before responding
        //     //return 
        //     // return user.incLoginAttempts(function (err, res) {
        //     //   console.log('incLoginAttempts resp', res);
        //     //   if (err) return cb(err);
        //     //   return cb(null, null, FaildLoginReasons.PASSWORD_INCORRECT);
        //     // });
        //   });
    //   });
    // };
  




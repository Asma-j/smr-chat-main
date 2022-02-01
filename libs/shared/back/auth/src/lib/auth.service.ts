import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService }  from '@mslibs/shared-back-user';
import { JwtUserPayload } from '@mslibs/shared/front-back/auth/dtos';
import { MsProvider } from '@mslibs/shared/front-back/user/dtos';
import { UserUpdateDto } from '@mslibs/shared/front-back/user/dtos';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      console.log('validateUser user',email);
      const user = await this.userService.checkLogin(email, pass);
      console.log('validateUser user',user);
      if (user) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  async login(user: any) {
    console.log('auth service login',user);
    const payload = { id: user.id, provider: user.provider };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthLogin(thirdPartyProfile: any, provider: MsProvider): Promise<string> {
    try {
      // registration logic here (if new user ) using their thirdPartyId (in this case their googleId)
      let user: UserUpdateDto = await this.userService.findOneByThirdPartyId(thirdPartyProfile.id, provider);
      if (!user) {
        // 'Not found user - New Register third party user'
        user = await this.userService.registerOAuthUser(thirdPartyProfile, provider);
      }
      const payload: JwtUserPayload = { provider: provider, id: user._id };
      const respJwt = this.jwtService.sign(payload);
      return respJwt ;
    }
    catch (err) {
      console.error("Auth provider", provider, 'Exception', err);
      throw new UnauthorizedException();
    }
  }


}

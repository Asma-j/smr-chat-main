import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { AuthService } from '../auth.service';
import { ConfigService } from "@nestjs/config";
import { MsProvider } from "@mslibs/shared/front-back/user/dtos";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google')
{

    constructor(private readonly authService: AuthService, configService : ConfigService) {
        super({
            clientID:  configService.get('gClientId'),
            clientSecret:  configService.get('gClientSecret'),
            callbackURL: configService.get('gauthCallBackUrl'),
            access_type: 'offline',
            passReqToCallback: true,
            scope: ['profile','email']
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        try{
            const jwt: string = await this.authService.validateOAuthLogin(profile, MsProvider.GOOGLE);
            const user = { jwt }
            return done(null, user);
        }
        catch(err)
        {
            done(err, false);
            throw new UnauthorizedException();
        }
    }
}
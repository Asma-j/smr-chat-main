import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from '../auth.service';
import { Strategy } from "passport-facebook";
import { ConfigService } from "@nestjs/config";
import { MsProvider } from "@mslibs/shared/front-back/user/dtos";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook')
{

    constructor(private readonly authService: AuthService,
        configService : ConfigService) {
        super({
            clientID:  configService.get('fClientId'),
            clientSecret:  configService.get('fClientSecret'),
            callbackURL: configService.get('fauthCallBackUrl'),
            fbGraphVersion: 'v7.0'
        })
    }

    async validate( accessToken: string, refreshToken: string, profile, done: Function)
    {
        try{
            console.log('Facebook profile:',profile);
            const jwt: string = await this.authService.validateOAuthLogin(profile, MsProvider.FACEBOOK);
            const user = { jwt }
            done(null, user);
        }
        catch(err)
        {
            console.log('Facebook validate err',err);
            done(err, false);
            throw new UnauthorizedException();
        }
    }
}
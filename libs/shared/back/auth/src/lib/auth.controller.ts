import { Controller, Request, Get, Post, UseGuards, Req, Res, Redirect, Inject, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private configService: ConfigService
    ) {
    }

    /**Used in collection controller module */
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    /** google auth */
    @Get('auth/google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {/* initiates the Google OAuth2 login flow */ }

    /** google auth callback*/
    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    @Redirect()
    async googleLoginCallback(@Req() req) {
        const jwt: string = req.user.jwt;
        if (jwt) {
            return {
                statusCode: HttpStatus.PERMANENT_REDIRECT,
                url: this.configService.get('baseUrl') + 'public/glogin/success/' + jwt
            };

        } else {
            return {
                statusCode: HttpStatus.PERMANENT_REDIRECT,
                url: this.configService.get('baseUrl')  + 'public/glogin/failure/'
            }
        }
    }


    /** facebook auth */
    @Get('auth/facebook')
    @UseGuards(AuthGuard('facebook'))
    facebookLogin() {/* initiates the Facebook OAuth2 login flow */ }

    /** facebook auth callback*/
    @Get('auth/facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    @Redirect()
    facebookLoginCallback(@Req() req, @Res() res) {
        const jwt: string = req.user.jwt;
        if (jwt) {
            return {
                statusCode: HttpStatus.PERMANENT_REDIRECT,
                url: this.configService.get('baseUrl')  + 'public/flogin/success/' + jwt
            };
        }
        else {
            return {
                statusCode: HttpStatus.PERMANENT_REDIRECT,
                url: this.configService.get('baseUrl')  + 'public/flogin/failure/'
            };
        }
    }
}

import { environment } from '../../environments/environment';

export default () => ({
    production: process.env.production || environment.production,
    baseUrl: process.env.baseUrl || environment.baseUrl,
    apiPort: parseInt(process.env.PORT, 10) || environment.apiPort,
    apiUrl: process.env.apiUrl || environment.apiUrl,
    //Google & Fb redirect url auth
    gauthCallBackUrl: process.env.gauthCallBackUrl || environment.gauthCallBackUrl,
    fauthCallBackUrl: process.env.fauthCallBackUrl || environment.fauthCallBackUrl,
    // DB
    mongoUri: process.env.mongoUri || environment.mongoUri,
    // JWT
    jwtSecret: process.env.jwtSecret || environment.jwtSecret,
    //Google auth
    gClientId: process.env.gClientId || environment.gClientId,
    gClientSecret: process.env.gClientSecret || environment.gClientSecret,
    //Facebook auth
    fClientId: process.env.fClientId || environment.fClientId,
    fClientSecret: process.env.fClientSecret || environment.fClientSecret,
});
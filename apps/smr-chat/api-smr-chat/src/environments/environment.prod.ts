/* add it directly in your server using pm2 command check secrest file /server:
Staging for now 
*/
export const environment = {
  production: true,
  baseUrl: 'https://smr-chat-next.net/',
  apiPort: 3334,
  apiUrl :'http://localhost:3334/',
  //Google & Fb redirect url auth
  gauthCallBackUrl :'https://smr-chat-next.net/api/auth/google/callback',
  fauthCallBackUrl :'https://smr-chat-next.net/api/auth/facebook/callback',
  // DB
  // mongoUri: 'mongodb://localhost/free-life-db-prod',
  // // JWT
  // jwtSecret: 'ms-life-nest-local-secretKey-001',
  // // Google auth secrets
  // gClientId :'',
  // gClientSecret :'',
  // //Facebook auth secrets
  // fClientId :'',
  // fClientSecret :''
};

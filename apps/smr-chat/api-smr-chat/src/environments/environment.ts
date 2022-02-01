/* Local dev envirement using staging secrets */
export const environment = {
  production: false,
  baseUrl: 'http://localhost:4201/',
  apiPort: 3334,
  apiUrl :'http://localhost:3334/',
  //Google & Fb redirect url auth
  gauthCallBackUrl :'http://localhost:3334/api/auth/google/callback',
  fauthCallBackUrl :'http://localhost:3334/api/auth/facebook/callback',
  // DB
  mongoUri: 'mongodb://localhost/smr_chat_db_local',
  // JWT
  jwtSecret: 'smr-chat-nest-local-secretKey-001',
  //Google auth
  gClientId :'todo',
  gClientSecret :'todo',
  //Facebook auth
  fClientId :'todo',
  fClientSecret :'todo'
};

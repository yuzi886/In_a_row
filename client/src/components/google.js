//client_id:136640376347-m5f5925tl99f6gj67k116kes0oibftpm.apps.googleusercontent.com
//client_secret:SjjWRWsF_wwpzh-tPKOEQDkG
import * as queryString from 'query-string';

function google_url (){
  const stringifiedParams = queryString.stringify({
    client_id:'136640376347-m5f5925tl99f6gj67k116kes0oibftpm.apps.googleusercontent.com' ,
    redirect_uri: 'http://localhost:3001/api/login/google',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // space seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });

  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  return googleLoginUrl;
};


export default google_url;

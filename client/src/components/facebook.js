import * as queryString from 'query-string';

function facebook_url(){
 const stringifiedParams = queryString.stringify({
  client_id:[1064107504081175],
  redirect_uri: 'http://localhost:3001/api/login/facebook',// to direct the page you want to come back
  scope: ['email', 'user_friends'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
 });
 const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
 return facebookLoginUrl;
}



export default facebook_url;

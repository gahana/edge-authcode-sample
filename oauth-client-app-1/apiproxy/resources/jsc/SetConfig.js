// Set the below variables as per env
var client_id = '<app 1 client id>';
var client_secret = '<app 1 client secret>';
var scope = 'scope1 scope2 scope3';
var callback_path = '/oauth-sample/app1/callback';
var authorize_path = '/oauth-sample/oauth/authorize';
var resource_path = 'oauth-sample/app1/resource'; // No leading '/''
var token_path = 'oauth-sample/oauth/token';  // No leading '/'

var req_verb = context.getVariable('request.verb');
var req_scheme = context.getVariable('client.scheme');
var req_host = context.getVariable('request.header.host');
var req_path = context.getVariable('request.uri');
var base_uri = req_scheme + "://" + req_host;
var redirect_uri = base_uri + callback_path;
var authorize_uri = base_uri + authorize_path;
var current_uri = req_host + req_path;  // HTTPTargetConnection in ServiceCallout does not allow full variable for URL
var state = { bookmark: current_uri };

context.setVariable('oauth.resource_host', req_host);
context.setVariable('oauth.resource_path', resource_path);
context.setVariable('oauth.token_path', token_path);

context.setVariable('oauth.redirect_uri', redirect_uri);
context.setVariable('oauth.authorize_uri', authorize_uri);

context.setVariable('oauth.client_id', client_id);
context.setVariable('oauth.client_secret', client_secret);
context.setVariable('oauth.scope', scope);
context.setVariable('oauth.state', JSON.stringify(state));

var params = 'client_id=' + client_id + '&' + 
             'redirect_uri=' + redirect_uri + '&' +
             'scope=' + scope + '&' +
             'state=' + JSON.stringify(state);
context.setVariable('oauth.authorize_req', authorize_uri + '?' + params);
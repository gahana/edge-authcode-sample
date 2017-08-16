var stateStr = context.getVariable('request.queryparam.state');
var stateObj = JSON.parse(stateStr);
context.setVariable('oauth.bookmark', stateObj.bookmark);
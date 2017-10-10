var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var AUTH_URL = 'https://org-env.apigee.net/oauth-sample/oauth/authcode';

var app = express();
app.set('views', './views');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  var params = getParams(req.query);
  params.message = "";
  res.render('login', params);
});

app.post('/', function(req, res) {
  if ("friend" === req.body.username) {
    var params = getParams(req.body);
    params.scopeList = params.scope.split(" ");
    res.render('consent', params);
  } else {
    var params = getParams(req.body);
    params.message = "Only a friend can enter";
    res.render('login', params);
  }
});

app.post('/consent', function(req, res) {
  if ("allow" === req.body.consent) {
    getAuthCode(req, res);
  } else {
    res.status(401).send("User denied consent");
  }
});

function getAuthCode(parentRequest, parentResponse) {
  console.log(parentRequest);
  request(authCodeOptions(parentRequest), function(error, response, body) {
      console.log("AuthCodeResponseError: " + error);
      console.log("AuthCodeResponseStatus: " + response.statusCode);
      console.log("AuthCodeResponseBody: " + body);
      if (!error && response.statusCode == 200) {
        parentResponse.redirect(parentRequest.body.redirect_uri + '?code=' + JSON.parse(body).auth_code + '&state=' + parentRequest.body.state);
      } else {
        parentResponse.status(401).send("Unable to get authorization code: " + error);
      }
  });
}

function authCodeOptions(req) {
  var params = getParams(req.body);
  params.response_type = 'code';
  return {
    url: AUTH_URL,
    method: 'POST',
    qs: params
  };
}

function getParams(ref) {
  var params = {};
  params.client_id = ref.client_id;
  params.redirect_uri = ref.redirect_uri;
  params.scope = ref.scope;
  params.state = ref.state;
  params.app_name = ref.app_name;
  return params;
}

app.get('/hello', function(req, res) {
  res.send("Hello World!");
});

app.listen(9000);

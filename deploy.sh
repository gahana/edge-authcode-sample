#!/bin/bash

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
USAGE="Usage: deploy [all|oauth|login|app1|app2]"
ORG="org"
ENV="env"

if [ -z "$1" ]; then
	set -- "all"
fi
set -eu

cd $BASEDIR

if [ "$1" = "oauth" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oauth-authcode-api -d ./oauth-authcode-api
fi

if [ "$1" = "login" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oauth-login-app -d ./oauth-login-app -R	
fi

if [ "$1" = "app1" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oauth-client-app-1 -d ./oauth-client-app-1
fi

if [ "$1" = "app2" ] || [ "$1" = "all" ] ; then
	apigeetool deployproxy -u $EDGE_USERNAME -p $EDGE_PASSWORD -o $ORG -e $ENV -n oauth-client-app-2 -d ./oauth-client-app-2
fi


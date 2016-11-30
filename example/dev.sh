#!/bin/sh

# You need 2 users (dev and test)

oc login localhost:8443 -u dev -p dev
oc new-project node-app-dev
oc create -f configmap-dev.json
oc create -f node-app-deployment.json
oc create -f node-app-build.json


# Login in back as developer
echo ""
echo ""
echo "You're now user: dev"

echo ""
echo "Building the app as developer:"
echo ""
echo "  oc start-build node-app -n node-app-dev --from-dir=.. --follow  "
echo ""
echo ""
echo ""
echo "If you want to promote the application, you can:"
echo ""
echo "   oc tag node-app-dev/node-app:latest node-app-test/node-app:latest   "
echo ""
echo ""

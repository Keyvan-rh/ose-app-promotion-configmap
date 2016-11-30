#!/bin/sh

echo "Deleting the projects ...."
oc login localhost:8443 -u admin -p admin
oc delete project/node-app-dev project/node-app-test 
oc delete role image-tagger

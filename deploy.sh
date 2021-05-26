#!/usr/bin/env bash

set -xe

SSH='ssh -i ~/.ssh/raszyk-plesk.pem ubuntu@ec2-3-127-181-35.eu-central-1.compute.amazonaws.com'
TARGET=/var/www/vhosts/geofind.io/httpdocs/geofind/
$SSH "cd $TARGET && sudo git pull origin redesign"
$SSH "cd $TARGET && sudo bash build.sh"

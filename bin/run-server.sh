#!/usr/bin/env bash
server_path=${PWD}/node_modules/.bin/http-server
cd $1 && ${server_path}

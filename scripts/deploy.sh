#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

make package
make publish

# TODO: Use rolling updates for this.
kubectl set image deployment/graphql-live graphql-live=melonproject/graphql-server:${TRAVIS_BUILD_ID}
kubectl set image deployment/graphql-kovan graphql-kovan=melonproject/graphql-server:${TRAVIS_BUILD_ID}

kubectl set image deployment/faucet faucet=melonproject/faucet:${TRAVIS_BUILD_ID}

kubectl set image deployment/ranking ranking=melonproject/ranking:${TRAVIS_BUILD_ID}
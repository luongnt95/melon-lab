#!/bin/bash

curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.10.4/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

mkdir ${HOME}/.kube
tee $HOME/.kube/config > /dev/null <<"EOF"
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data:
    server:
  name: prod-infra-kubernetes
contexts:
- context:
    cluster: prod-infra-kubernetes
    user: clusterUser_prod-infra-kubernetes_prod-infra-kubernetes
  name: prod-infra-kubernetes
current-context: prod-infra-kubernetes
kind: Config
preferences: {}
users:
- name: clusterUser_prod-infra-kubernetes_prod-infra-kubernetes
  user:
    client-certificate-data:
    client-key-data:
EOF

kubectl config set clusters.prod-infra-kubernetes.certificate-authority-data "$KUBE_CA_CERT"
kubectl config set clusters.prod-infra-kubernetes.server "$KUBE_ENDPOINT"

kubectl config set users.clusterUser_prod-infra-kubernetes_prod-infra-kubernetes.client-certificate-data "$KUBE_ADMIN_CERT"
kubectl config set users.clusterUser_prod-infra-kubernetes_prod-infra-kubernetes.client-key-data "$KUBE_ADMIN_KEY"

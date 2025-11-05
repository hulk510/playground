
## ダッシュボードのポートフォワード

kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443

## tokenを吐き出す

kubectl -n kubernetes-dashboard create token admin-user

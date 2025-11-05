# Immich インストール手順

## 前提条件

- Kubernetes クラスタが稼働していること
- `kubectl` と `helm` がインストールされていること

## インストール手順

### 1. CloudNativePG Operator をインストール

```bash
kubectl apply --server-side -f \
  https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.27/releases/cnpg-1.27.1.yaml
```

Operatorが起動するまで待つ:

```bash
kubectl get pods -n cnpg-system
```

### 2. PostgreSQL クラスタを作成

```bash
kubectl apply -f postgres-cluster.yaml
```

PostgreSQLが起動するまで待つ:

```bash
kubectl get cluster -n immich
kubectl get pods -n immich
```

### 3. PVC を作成

```bash
kubectl apply -f pvc.yaml
```

### 4. Immich をインストール

```bash
helm install --create-namespace --namespace immich immich \
  oci://ghcr.io/immich-app/immich-charts/immich \
  -f values.yaml
```

### 5. 動作確認

```bash
kubectl get pods -n immich
kubectl get svc -n immich
```

### 6. アクセス

ポートフォワードでローカルからアクセス:

```bash
kubectl port-forward -n immich svc/immich-server 3001:3001
```

ブラウザで http://localhost:3001 を開く

## アンインストール

```bash
helm uninstall immich -n immich
kubectl delete -f postgres-cluster.yaml
kubectl delete -f pvc.yaml
kubectl delete namespace immich
```

## トラブルシューティング

### Podが起動しない場合

```bash
kubectl describe pod <pod-name> -n immich
kubectl logs <pod-name> -n immich
```

### PVCがPendingの場合

```bash
kubectl describe pvc immich-library-pvc -n immich
```

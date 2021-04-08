# Log in to a container registry
Use this GitHub Action to [log in to a private container registry](https://docs.docker.com/engine/reference/commandline/login/) of [HuaweiCloud Cloud Container Registry](https://support.huaweicloud.com/swr/). Once login is done, the next set of actions in the workflow can perform tasks such as building, tagging and pushing containers.
```yaml
- uses: huaweicloud/swr-login@v1
  with:
    region: '<region id>' # example: ap-southeast-3
    access-key-id: '<access key id>'
    access-key-secret: '<access key secret>'
```
## Reference
The AK/SK signature algorithm implementation and http request is refer to [hwcce-k8s](https://www.npmjs.com/package/hwcce-k8s).

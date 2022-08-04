# Log in to Huawei Cloud SWR
使用此GitHub Action登录到华为云容器镜像服务[SWR(SoftWare Repository for Container)](https://support.huaweicloud.com/swr/)。登录完成之后，workflow中其他操作步骤可以执行镜像构建、镜像推送、镜像拉取等操作。


## Action参数  
> 提示：下面参数标注 🔐 的参数属于敏感信息，建议在GitHub项目的setting--Secret--Actions下添加私密参数。

| Name          | Sensitive | Require | Description |
| ------------- | ------- | ------- | ----------- |
| access-key-id    |   🔐    |   true      | 华为云访问密钥ID即AK,可以在[我的凭证](https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html?utm_campaign=ua&utm_content=ca&utm_term=console)获取。|
| access-key-secret    |   🔐    |    true     | 华为云访问密钥即SK,可以在[我的凭证](https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html?utm_campaign=ua&utm_content=ca&utm_term=console)获取。|
| region    |           |     true   | 华为云区域，可以在[我的凭证](https://console.huaweicloud.com/iam/?locale=zh-cn#/mine/apiCredential)获取|

## 参考实例

```yaml
- uses: huaweicloud/swr-login@v2.0.0
  with:
    access-key-id: ${{ secrets.ACCESSKEY }} 
    access-key-secret: ${{ secrets.SECRETACCESSKEY }}
    region: '<region id>'  # example: cn-north-4
```
详情可参考 [swr-login-workflow-samples](https://github.com/huaweicloud/swr-login-workflow-samples)


## Action中使用的公网地址说明
本action是华为云SWR鉴权，使用过程会调用华为云的OpenAPI，涉及到的公网域名可到华为云[地区和终端节点](https://developer.huaweicloud.com/endpoint?all)查看。
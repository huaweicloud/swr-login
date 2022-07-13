import * as core from '@actions/core';
import * as context from './context';

import * as huaweicore from '@huaweicloud/huaweicloud-sdk-core';
import * as swr from '@huaweicloud/huaweicloud-sdk-swr';

/**
 * 获取swr临时登录指令
 * @param
 * @returns
 */
export async function createSecret(inputs: context.Inputs): Promise<string> {
    const credentials = new huaweicore.BasicCredentials()
        .withAk(inputs.accessKey)
        .withSk(inputs.secretKey);
    const client = swr.SwrClient.newBuilder()
        .withCredential(credentials)
        .withEndpoint(`https://swr-api.${inputs.region}.myhuaweicloud.com`)
        .build();
    const request = new swr.CreateSecretRequest();
    request.projectname = inputs.region;
    const result = await client.createSecret(request);
    if (result.httpStatusCode != 200) {
        core.setFailed('Get SWR Secret Failed.');
    }
    return JSON.stringify({auths: result.auths});
}

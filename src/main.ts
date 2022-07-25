import * as core from '@actions/core';
import * as context from './context';
import * as utils from './utils';
import * as swr from './swr';
import * as docker from './dockerConfig';

export async function run() {
    const inputs: context.Inputs = context.getInputs();

    // 如果参数输入有问题，终止操作
    if (!utils.checkInputs(inputs)) {
        core.setFailed('input parameters is not correct.');
        return;
    }

    docker.setDockerEnv(await swr.createSecret(inputs));
}

run().catch(core.setFailed);

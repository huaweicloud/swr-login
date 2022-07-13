import * as core from '@actions/core';

export interface Inputs {
    accessKey: string;
    secretKey: string;
    region: string;
}

export function getInputs(): Inputs {
    return {
        accessKey: core.getInput('access-key-id', {required: true}),
        secretKey: core.getInput('access-key-secret', {required: true}),
        region: core.getInput('region', {required: true})
    };
}

export const CUSTOM_USER_AGENT =
    'DevKit-GitHub:Huawei Cloud Software Repository for Container (SWR) Login';

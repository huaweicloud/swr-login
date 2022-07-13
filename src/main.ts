import * as core from '@actions/core';
import * as context from './context';
import * as swr from './swr';
import * as docker from './dockerConfig';


export async function run() {
    const inputs: context.Inputs = context.getInputs();

    docker.setDockerEnv(swr.createSecret(inputs))
}

run().catch(core.setFailed);

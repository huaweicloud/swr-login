import * as docker from '../src/dockerConfig';
import * as core from '@actions/core';

jest.mock('@actions/core');

beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.RUNNER_TEMP;
});

test('test set docker environment variable when RUNNER_TEMP exists', async () => {
    process.env.RUNNER_TEMP = '/tmp';
    await docker.setDockerEnv('test');
    expect(core.info).toHaveBeenCalledTimes(1);
});


test('test set docker environment variable when RUNNER_TEMP does not exist', async () => {
    await docker.setDockerEnv('test');
    expect(core.info).toHaveBeenCalledTimes(1);
});
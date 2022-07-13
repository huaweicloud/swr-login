import * as docker from '../src/dockerConfig';
import * as core from '@actions/core';

jest.mock('@actions/core');

beforeEach(() => {
    jest.clearAllMocks();
});

test('test set docker environment variable', async () => {
    await docker.setDockerEnv('test');
    expect(core.info).toHaveBeenCalledTimes(1);
});
import * as core from '@actions/core';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

/**
 * 设置DOCKER_CONFIG环境变量
 * @param dockerConfig
 */
export async function setDockerEnv(dockerConfig: string) {
    // Using process.env until the core libs are updated
    const runnerTempDirectory = process.env.RUNNER_TEMP ?? os.homedir();
    const dirPath = path.join(runnerTempDirectory, `docker_login_${Date.now()}`);
    fs.mkdirSync(dirPath);
    const dockerConfigPath = path.join(dirPath, `config.json`);
    fs.writeFileSync(dockerConfigPath, dockerConfig);

    // Set DOCKER_CONFIG environment variable and set it as secrets.
    core.setSecret(dirPath);
    core.exportVariable('DOCKER_CONFIG', dirPath);
    core.info('DOCKER_CONFIG environment variable is set');
}

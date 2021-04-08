const core = require('@actions/core');
const io = require('@actions/io');

const path = require('path');
const fs = require('fs');

const http_request = require('./http_request');


async function run() {
    let ak = core.getInput('access-key-id', { required: true });
    let sk = core.getInput('access-key-secret', { required: true });
    let region = core.getInput('region', { required: true });
    let url = `https://swr-api.${region}.myhuaweicloud.com/v2/manage/utils/secret?projectname=${region}`;
    http_request.init_sign({AccessKey:`${ak}`, SecretKey:`${sk}`});
    config = await http_request.http_request("POST", url, "", {});

    const runnerTempDirectory = process.env['RUNNER_TEMP']; // Using process.env until the core libs are updated
    const dirPath = path.join(runnerTempDirectory, `docker_login_${Date.now()}`);
    await io.mkdirP(dirPath);
    const dockerConfigPath = path.join(dirPath, `config.json`);
    core.debug(`Writing docker config contents to ${dockerConfigPath}`);
    fs.writeFileSync(dockerConfigPath, JSON.stringify(config));
    core.setSecret(dirPath);
    core.exportVariable('DOCKER_CONFIG', dirPath);
    console.log('DOCKER_CONFIG environment variable is set');
}

run().catch(e => core.setFailed(e));

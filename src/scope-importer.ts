import * as path from "path";
import * as core from '@actions/core';
import * as exec from '@actions/exec';

const IS_WINDOWS = process.platform === 'win32';
let tempDirectory = process.env['RUNNER_TEMP'] || '';

if (!tempDirectory) {
    let baseLocation;
    if (IS_WINDOWS) {
        // On windows use the USERPROFILE env variable
        baseLocation = process.env['USERPROFILE'] || 'C:\\';
    } else {
        baseLocation = (process.platform==='darwin') ? '/Users':'/home'
    }
    tempDirectory = path.join(baseLocation, 'actions', 'temp');
}

async function run() {

    try {
        let dsn = core.getInput("dsn", {required: true});
        await core.exportVariable("SCOPE_DSN", dsn);

        let pathVar = core.getInput("path", {required: true});

        await core.exportVariable("GOBIN", tempDirectory);
        await exec.exec("go get github.com/undefinedlabs/scope-junit");
        await exec.exec("go install github.com/undefinedlabs/scope-junit");

        const scopeJUnitTool = (IS_WINDOWS) ? "scope-junit.exe":"scope-junit";
        await exec.exec(tempDirectory+"/"+scopeJUnitTool+" --path "+pathVar);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
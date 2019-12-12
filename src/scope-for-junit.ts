import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
    try {

        let dsn = core.getInput("dsn", {required: true});
        core.exportVariable("SCOPE_DSN", dsn);

        let path = core.getInput("path", {required: true});

        await exec.exec("go get github.com/go-training/helloworld");
        await exec.exec("go install github.com/go-training/helloworld");
        await exec.exec("./helloworld");

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
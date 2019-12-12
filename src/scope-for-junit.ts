import * as core from '@actions/core'

async function run() {
    try {
        let dsn = core.getInput("dsn", {required: true})
        core.exportVariable("SCOPE_DSN", dsn);

    } catch (error) {
        core.setFailed(error.message)
    }
}

run();
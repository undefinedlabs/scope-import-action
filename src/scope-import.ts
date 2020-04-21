import * as path from "path";
import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as tc from "@actions/tool-cache";
import * as io from "@actions/io";

const IS_WINDOWS = process.platform === "win32";
const IS_MACOS = process.platform === "darwin";

async function run() {
  try {
    let dsn = core.getInput("dsn", { required: true });
    await core.exportVariable("SCOPE_DSN", dsn);

    let pathVar = core.getInput("path", { required: true }).replace(/\n/g, " ");

    const platform = IS_WINDOWS ? "windows" : IS_MACOS ? "darwin" : "linux";

    let scopeImportToolPath;
    scopeImportToolPath = await tc.downloadTool(
      "https://home.undefinedlabs.com/download/scope-import/" +
        platform +
        "/x86_64"
    );
    if (IS_WINDOWS && !scopeImportToolPath.endsWith(".exe")) {
      await io.mv(scopeImportToolPath, scopeImportToolPath + ".exe");
      scopeImportToolPath = scopeImportToolPath + ".exe";
    } else {
      await exec.exec("chmod +x " + scopeImportToolPath);
    }
    await exec.exec(scopeImportToolPath + " " + pathVar);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

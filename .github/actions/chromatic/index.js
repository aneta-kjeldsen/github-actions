const core = require("@actions/core");
const github = require("@actions/github");
const execSync = require("child_process").execSync;
import { Octokit } from "octokit/rest";

try {
  const jobOutput = execSync(`npm -v
  node -v`)
    .toString()
    .trim();
  core.setOutput("job_output", jobOutput);
  const octokit = new Octokit({ auth: core.getInput("token") });
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
  const run = await octokit.rest.checks.get({
    owner,
    repo,
    check_run_id,
  });
  console.log(run);
} catch (error) {
  core.setFailed(error.message);
}

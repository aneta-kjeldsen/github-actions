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
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: "aneta-kjeldsen",
    repo: "github-actions",
    pull_number: 1,
  });
  console.log("pullRequest", pullRequest);
} catch (error) {
  core.setFailed(error.message);
}

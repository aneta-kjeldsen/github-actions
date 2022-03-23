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
  errorCount = 0;
  const check = {
    owner,
    repo,
    completed_at: new Date().toISOString(),
    head_sha: HEAD,
    conclusion: (errorCount > 0 && "failure") || "success",
    output: {
      title: `${tool} Results`,
      summary,
      annotations: first,
    },
  };
  await octokit.checks.create(check).catch(async (error) => {
    console.log("Failed to create check with error:", error);
    const PRE_HEAD = (await execa("git", ["rev-parse", "HEAD^1"])).stdout;
    return octokit.checks.create({ ...check, head_sha: PRE_HEAD });
  });
} catch (error) {
  core.setFailed(error.message);
}

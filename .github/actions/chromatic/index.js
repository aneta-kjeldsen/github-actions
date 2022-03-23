const core = require("@actions/core");
const github = require("@actions/github");
const execSync = require("child_process").execSync;

try {
  const jobOutput = execSync(`npm -v`).toString().trim();
  core.setOutput("job_output", jobOutput);
} catch (error) {
  core.setFailed(error.message);
}

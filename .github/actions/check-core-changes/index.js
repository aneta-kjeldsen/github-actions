const core = require("@actions/core");
const execSync = require("child_process").execSync;

try {
  const diff = execSync("git diff --name-only HEAD^..HEAD").toString();
  console.log("diff", diff);
  const diffArray = diff.length ? diff.split("\n") : [];
  const coreChanges = diffArray.filter((diff) => diff.includes("mds-components-core"));
  console.log("coreChanges", coreChanges);
  core.setOutput("job_output", coreChanges);
} catch (error) {
  core.setFailed(error.message);
}

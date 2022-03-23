const core = require("@actions/core");
const github = require("@actions/github");
const execSync = require("child_process").execSync;
import createCheck from "create-check";

try {
  const jobOutput = execSync(`npm -v
  node -v`)
    .toString()
    .trim();
  core.setOutput("job_output", jobOutput);

  const main = async () => {
    await createCheck({
      tool: "stylelint",
      name: "Check Styles for Errors",
      annotations: "test",
      errorCount: 0,
      warningCount: 1,
      appId: APP_ID,
      privateKey: PRIVATE_KEY,
    });

    console.log("Created check on PR");
  };
  main();
} catch (error) {
  core.setFailed(error.message);
}

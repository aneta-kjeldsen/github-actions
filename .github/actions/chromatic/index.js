const core = require("@actions/core");
const execSync = require("child_process").execSync;
import { Octokit } from "octokit";

try {
  const jobOutput =
    `> @maersk-global/components@0.0.0 chromatic:ci /home/runner/work/mds-components/mds-components
  > chromatic --storybook-build-dir storybook-static --only '**/{E2E/VR,Foundations,V2 legacy}/**'
  
  
  Chromatic CLI v6.5.3
  https://www.chromatic.com/docs/cli
  
  Authenticating with Chromatic
      → Connecting to https://index.chromatic.com
  Authenticated with Chromatic
      → Using project token '********c31d'
  Retrieving git information
  ℹ Use our GitHub Action
  It appears you are using a GitHub Actions workflow, but are not using the official GitHub Action for Chromatic.
  Find it at https://github.com/marketplace/actions/publish-to-chromatic
  Using custom npm registry: http://registry.npmjs.org/
  Retrieved git information
      → Commit 'f1da540' on branch 'feat/chromatic-gh-workflow'; found 1 parent build
  Collecting Storybook metadata
  Collected Storybook metadata
      → Storybook ^6.3.11 for Web Components; supported addons found: A11y, Actions, Docs, Essentials, Links
  Publish your built Storybook
      → Validating Storybook files
  Publishing your built Storybook
      → Retrieving target location
      → Starting publish
  Publish complete in 5 seconds
      → View your Storybook at https://6239db4e06e800003a113142-ywwgedejas.chromatic.com
  Verifying your Storybook
      → This may take a few minutes
  Starting partial build
      → Snapshots will be limited to stories matching '**/{E2E/VR,Foundations,V2 legacy}/**'
  Started build 28
      → View build details at https://www.chromatic.com/build?appId=6239db4e06e800003a113142&number=28
  Running 134 tests for stories matching '**/{E2E/VR,Foundations,V2 legacy}/**'
      → This may take a few minutes
  ✔ Build 28 passed!
  No visual changes were found in this build.
  ℹ View build details at https://www.chromatic.com/build?appId=6239db4e06e800003a113142&number=28
  Build 28 passed!
      → Tested 134 stories across 36 components; captured 134 snapshots in 3 minutes 44 seconds`
      .toString()
      .trim();
  const storybookDetails = jobOutput
    .match(/View your Storybook at https:\/\/([\s\S]*?).chromatic.com/)[0]
    .replace("View your Storybook at ", "");
  const buildDetails = jobOutput
    .match(/appId=([\s\S]*?)\n/)[0]
    .replaceAll("\n", "");
  console.log("storybookDetails: ", storybookDetails);
  console.log("buildDetails: ", buildDetails);

  const output = `[View Storybook](${storybookDetails}) | [Visual regression build results](https://www.chromatic.com/build?${buildDetails})`;
  core.setOutput("job_output", output);
  const diff = execSync("git diff --name-only HEAD^ HEAD");
  console.log({ diff });
} catch (error) {
  core.setFailed(error.message);
}

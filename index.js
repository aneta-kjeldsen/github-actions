// var fs = require("fs");
// var jwt = require("jsonwebtoken");
// const { Octokit } = require("@octokit/core");
const execSync = require("child_process").execSync;

// var privateKey = fs.readFileSync("private-key.pem");
// var token = jwt.sign(
//   {
//     iss: "183407",
//     iat: Math.floor(Date.now() / 1000) - 60,
//     exp: Math.floor(Date.now() / 1000) + 60 * 10,
//   },
//   privateKey,
//   { algorithm: "RS256" }
// );
// YOUR_JWT, ID: 183407
// console.log(
//   `curl -i -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/app`
// );
// console.log(
//   `curl -i -X GET -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/app/installations`
// );
// console.log(
//   `curl -i -X GET -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/app/installations/24376381/access_tokens`
// );

// YOUR_INSTALLATION_ACCESS_TOKEN,ID: 24376381
// const getAccessToken = async () => {
//   const octokit = new Octokit({ auth: token });
//   return await octokit.request(
//     "POST /app/installations/{installation_id}/access_tokens",
//     {
//       installation_id: 24376381,
//       repositories: ["repositories"],
//     }
//   );
// };
// console.log(getAccessToken());
// console.log(
//   `curl -i -X POST -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/aneta-jeldsen/github-actions/check-runs`
// );

const pullRequestBody = null;
const pullRequestMetaBody = "testing one";
const pullRequestMetaTag = "BUILD INFO";
const diff = execSync("git diff --name-only HEAD").toString();

const diffArray = diff.split("\n")
const coreChanges = diffArray.filter(diff => diff.includes("mds-components-core"))
console.log(coreChanges)
const re = new RegExp(
  "<!--" +
    pullRequestMetaTag +
    " START-->([\\s\\S]*?)<!--" +
    pullRequestMetaTag +
    " END-->",
  "gmi"
);

const newDescription = `<!--${pullRequestMetaTag} START-->${pullRequestMetaBody}<!--${pullRequestMetaTag} END-->`;
const matchTag = pullRequestBody ? pullRequestBody.match(re) : null;

const newPullRequestBody = matchTag
  ? pullRequestBody.replace(re, newDescription)
  : pullRequestBody + newDescription;

console.log({
  re,
  newPullRequestBody,
});

// const jobOutput =
//   `> @maersk-global/components@0.0.0 chromatic:ci /home/runner/work/mds-components/mds-components
//   > chromatic --storybook-build-dir storybook-static --only '**/{E2E/VR,Foundations,V2 legacy}/**'

//   Chromatic CLI v6.5.3
//   https://www.chromatic.com/docs/cli

//   Authenticating with Chromatic
//       → Connecting to https://index.chromatic.com
//   Authenticated with Chromatic
//       → Using project token '********c31d'
//   Retrieving git information
//   ℹ Use our GitHub Action
//   It appears you are using a GitHub Actions workflow, but are not using the official GitHub Action for Chromatic.
//   Find it at https://github.com/marketplace/actions/publish-to-chromatic
//   Using custom npm registry: http://registry.npmjs.org/
//   Retrieved git information
//       → Commit 'f1da540' on branch 'feat/chromatic-gh-workflow'; found 1 parent build
//   Collecting Storybook metadata
//   Collected Storybook metadata
//       → Storybook ^6.3.11 for Web Components; supported addons found: A11y, Actions, Docs, Essentials, Links
//   Publish your built Storybook
//       → Validating Storybook files
//   Publishing your built Storybook
//       → Retrieving target location
//       → Starting publish
//   Publish complete in 5 seconds
//       → View your Storybook at https://6239db4e06e800003a113142-ywwgedejas.chromatic.com
//   Verifying your Storybook
//       → This may take a few minutes
//   Starting partial build
//       → Snapshots will be limited to stories matching '**/{E2E/VR,Foundations,V2 legacy}/**'
//   Started build 28
//       → View build details at https://www.chromatic.com/build?appId=6239db4e06e800003a113142&number=28
//   Running 134 tests for stories matching '**/{E2E/VR,Foundations,V2 legacy}/**'
//       → This may take a few minutes
//   ✔ Build 28 passed!
//   No visual changes were found in this build.
//   ℹ View build details at https://www.chromatic.com/build?appId=6239db4e06e800003a113142&number=28
//   Build 28 passed!
//       → Tested 134 stories across 36 components; captured 134 snapshots in 3 minutes 44 seconds`
//     .toString()
//     .trim();
// const storybookDetails = jobOutput
//   .match(/View your Storybook at https:\/\/([\s\S]*?).chromatic.com/)[0]
//   .replace("View your Storybook at ", "");
// const buildDetails = jobOutput.match(/appId=([\s\S]*?)\n/)[0];
// console.log("storybookDetails: ", storybookDetails);
// console.log("buildDetails: ", buildDetails);

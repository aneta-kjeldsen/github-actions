const core = require("@actions/core");
const github = require("@actions/github");
const execSync = require("child_process").execSync;
import { Octokit } from "octokit";

try {
  const jobOutput = execSync(`npm -v
  node -v`)
    .toString()
    .trim();
  core.setOutput("job_output", jobOutput);
  const octokit = new Octokit({
    auth: core.getInput("token"),
  });
  // const {
  //   data: { login },
  // } = await octokit.rest.users.getAuthenticated();
  // console.log("Hello, %s", login);

  // const { data: pullRequest } = await octokit.rest.pulls.get({
  //   owner: "aneta-kjeldsen",
  //   repo: "github-actions",
  //   pull_number: 1,
  // });
  // console.log("pullRequest", pullRequest);

  // await octokit.request(
  //   "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}",
  //   {
  //     owner: "aneta-kjeldsen",
  //     repo: "github-actions",
  //     comment_id: 1077397270,
  //     body: "new body",
  //   }
  // );

  const { data: pullRequest } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner: "aneta-kjeldsen",
      repo: "github-actions",
      pull_number: 1,
    }
  );
  const pullRequestBody = pullRequest.body;

  const newPullRequestBody = pullRequestBody.replace(
    /<!--BUILD INFO START-->([\s\S]*?)<!--BUILD INFO END-->/gm,
    `<!--BUILD INFO START-->
[View Storybook](https://6239db4e06e800003a113142-ywwgedejas.chromatic.com/)
[View VR build details](https://www.chromatic.com/build?appId=6239db4e06e800003a113142&number=28)
<!--BUILD INFO END-->`
  );

  await octokit.request("PATCH /repos/{owner}/{repo}/pulls/{pull_number}", {
    owner: "aneta-kjeldsen",
    repo: "github-actions",
    pull_number: 1,
    body: newPullRequestBody,
  });
} catch (error) {
  core.setFailed(error.message);
}

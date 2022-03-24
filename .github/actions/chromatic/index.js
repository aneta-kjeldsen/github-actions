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

  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: "aneta-kjeldsen",
    repo: "github-actions",
    pull_number: 1,
  });
  console.log("pullRequest", pullRequest);
  const { data: comment } = await octokit.rest.repos.updateCommitComment({
    owner: "aneta-kjeldsen",
    repo: "github-actions",
    comment_id: 1076761106,
    body: "new body",
  });

  // await octokit.request('PATCH /repos/{owner}/{repo}/comments/{comment_id}', {
  //   owner: "aneta-kjeldsen",
  //   repo: "github-actions",
  //   comment_id: 1076761106,
  //   body: "new body"
  // })
  console.log("comment", comment);
} catch (error) {
  core.setFailed(error.message);
}

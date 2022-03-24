const core = require("@actions/core");
const github = require("@actions/github");
const execSync = require("child_process").execSync;
import { Octokit } from "octokit";

try {
  const githubToken = core.getInput("github_token");
  const githubOwner = core.getInput("github_owner");
  const githubRepo = core.getInput("github_repo");
  const githubPullNumber = core.getInput("github_pull_number");
  const pullRequestMetaBody = core.getInput("pull_request_meta_body");
  const pullRequestMetaTag = core.getInput("pull_request_meta_tag");

  const octokit = new Octokit({
    auth: githubToken,
  });

  const { data: pullRequest } = await octokit.request(
    "GET /repos/{owner}/{repo}/pulls/{pull_number}",
    {
      owner: githubOwner,
      repo: githubRepo,
      pull_number: githubPullNumber,
    }
  );
  const pullRequestBody = pullRequest.body;

  const re = new RegExp(
    /<!--BUILD INFO START-->([sS]*?)<!--BUILD INFO END-->/,
    "gm"
  );
  const newDescription = `<!--BUILD INFO START-->${pullRequestMetaBody}<!--BUILD INFO END-->`;

  const newPullRequestBody = pullRequestBody.replace(re, newDescription);

  console.log({
    pullRequestBody,
    newPullRequestBody,
    pullRequestMetaBody,
    pullRequestMetaTag,
    re,
    newDescription,
  });

  await octokit.request("PATCH /repos/{owner}/{repo}/pulls/{pull_number}", {
    owner: githubOwner,
    repo: githubRepo,
    pull_number: githubPullNumber,
    body: newPullRequestBody,
  });
} catch (error) {
  core.setFailed(error.message);
}

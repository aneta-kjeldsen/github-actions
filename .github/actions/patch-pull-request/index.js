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
    `<!--${pullRequestMetaTag} START-->([\s\S]*?)<!--${pullRequestMetaTag} END-->`,
    "gm"
  );
  const newPullRequestBody = pullRequestBody.replace(
    re,
    `<!--${pullRequestMetaTag} START-->
${pullRequestMetaBody}
<!--${pullRequestMetaTag} END-->`
  );

  await octokit.request("PATCH /repos/{owner}/{repo}/pulls/{pull_number}", {
    owner: githubOwner,
    repo: githubRepo,
    pull_number: githubPullNumber,
    body: newPullRequestBody,
  });
} catch (error) {
  core.setFailed(error.message);
}

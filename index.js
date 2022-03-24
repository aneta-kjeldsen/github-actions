var fs = require("fs");
var jwt = require("jsonwebtoken");
const { Octokit } = require("@octokit/core");

var privateKey = fs.readFileSync("private-key.pem");
var token = jwt.sign(
  {
    iss: "183407",
    iat: Math.floor(Date.now() / 1000) - 60,
    exp: Math.floor(Date.now() / 1000) + 60 * 10,
  },
  privateKey,
  { algorithm: "RS256" }
);
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
const getAccessToken = async () => {
  const octokit = new Octokit({ auth: token });
  return await octokit.request(
    "POST /app/installations/{installation_id}/access_tokens",
    {
      installation_id: 24376381,
      repositories: ["repositories"],
    }
  );
};
console.log(getAccessToken());
// console.log(
//   `curl -i -X POST -H "Authorization: Bearer ${token}" -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/aneta-jeldsen/github-actions/check-runs`
// );

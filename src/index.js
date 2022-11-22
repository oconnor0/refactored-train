const github = require('@actions/github');
const core = require('@actions/core');
const process = require('process');

async function run() {
	try {
		console.log("process.env");
		console.log(process.env);
		// console.log("github");
		// console.log(github);
		console.log("github.context.payload.pull_request");
		console.log(github.context.payload.pull_request);
		// console.log("core");
		// console.log(core);

		const owner = github.context.payload.pull_request.head.repo.owner.login;
		const repo = github.context.payload.pull_request.head.repo.name;
		const pull_request_number = github.context.payload.pull_request.number;

		console.log("repo owner   " + owner);
		console.log("repo name    " + repo);
		console.log("github pr #  " + pull_request_number);
		console.log("github user  " + github.context.payload.pull_request.user.login);
		console.log("github title " + github.context.payload.pull_request.title);
		console.log("github body  " + github.context.payload.pull_request.body)

		const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
		const octokit = github.getOctokit(GITHUB_TOKEN);

		const result = await octokit.rest.issues.createComment({
			owner: owner,
			repo: repo,
			issue_number: pull_request_number,
			body: `You are so pretty.`
		});
		console.log(result);
	} catch (ex) {
		console.log(ex);
		core.setFailed(`Action failed with exception: ${ex}`);
	}
}

run();

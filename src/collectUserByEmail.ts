import { Octokit } from "octokit";

import { EmailFetcher } from "./types.js";

export async function collectUserByEmail(
	email: string,
	fetcher: EmailFetcher | Octokit,
) {
	return fetcher instanceof Octokit
		? (await fetcher.request("GET /search/users", { q: email })).data.items[0]
				?.login
		: await fetcher(email);
}

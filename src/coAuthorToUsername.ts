import { Octokit } from "octokit";

import { collectUserByEmail } from "./collectUserByEmail.js";
import { CoAuthor, CoAuthorToUsernameOptions } from "./types.js";

export async function coAuthorToUsername(
	coAuthor: CoAuthor,
	{ fetcher = new Octokit() }: CoAuthorToUsernameOptions = {},
) {
	if (coAuthor.username) {
		return coAuthor.username;
	}

	if (coAuthor.email) {
		return await collectUserByEmail(coAuthor.email, fetcher);
	}

	return undefined;
}

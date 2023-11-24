import { CachedFactory } from "cached-factory";
import { Octokit } from "octokit";

import { coAuthorToUsername } from "./coAuthorToUsername.js";
import { collectUserByEmail } from "./collectUserByEmail.js";
import {
	CoAuthor,
	CachingCoAuthorToUsername,
	CreateCachingCoAuthorToUsernameOptions,
} from "./types.js";

export function createCachingCoAuthorToUsername({
	fetcher = new Octokit(),
}: CreateCachingCoAuthorToUsernameOptions = {}): CachingCoAuthorToUsername {
	const cache = new CachedFactory(
		async (email: string) => await collectUserByEmail(email, fetcher),
	);
	const cachingFetcher = async (email: string) => await cache.get(email);

	return (coAuthor: CoAuthor) =>
		coAuthorToUsername(coAuthor, { fetcher: cachingFetcher });
}

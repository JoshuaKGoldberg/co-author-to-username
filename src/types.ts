import { Octokit } from "octokit";

export interface CoAuthor {
	email?: string;
	username?: string;
}

export type EmailFetcher = (email: string) => Promise<string | undefined>;

export interface CoAuthorToUsernameOptions {
	fetcher?: EmailFetcher | Octokit;
}

export type CachingCoAuthorToUsername = (
	coAuthor: CoAuthor,
) => Promise<string | undefined>;

export interface CreateCachingCoAuthorToUsernameOptions {
	fetcher?: EmailFetcher | Octokit;
}

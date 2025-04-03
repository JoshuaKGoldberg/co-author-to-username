import { Octokit } from "octokit";

export type CachingCoAuthorToUsername = (
	coAuthor: CoAuthor,
) => Promise<string | undefined>;

export interface CoAuthor {
	email?: string;
	username?: string;
}

export interface CoAuthorToUsernameOptions {
	fetcher?: EmailFetcher | Octokit;
}

export interface CreateCachingCoAuthorToUsernameOptions {
	fetcher?: EmailFetcher | Octokit;
}

export type EmailFetcher = (email: string) => Promise<string | undefined>;

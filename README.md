<h1 align="center">co-author-to-username</h1>

<p align="center">Fetches the GitHub username for a co-author, if possible. 📇</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="All Contributors: 1" src="https://img.shields.io/badge/all_contributors-17-21bb42.svg" /></a>
	<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://codecov.io/gh/JoshuaKGoldberg/co-author-to-username" target="_blank"><img alt="Codecov Test Coverage" src="https://codecov.io/gh/JoshuaKGoldberg/co-author-to-username/branch/main/graph/badge.svg"/></a>
	<a href="https://github.com/JoshuaKGoldberg/co-author-to-username/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" /></a>
	<a href="https://github.com/JoshuaKGoldberg/co-author-to-username/blob/main/LICENSE.md" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/JoshuaKGoldberg/co-author-to-username?color=21bb42"></a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
	<img alt="npm package version" src="https://img.shields.io/npm/v/create-typescript-app?color=21bb42" />
</p>

## Usage

```shell
npm i co-author-to-username
```

### `coAuthorToUsername`

This package exports a `coAuthorToUsername` function that can be used to fetch the corresponding GitHub user from a [`commit-to-co-author`](https://github.com/JoshuaKGoldberg/commit-to-co-author)-style co-author:

1. If the given co-author has a `username`, that username is returned directly
2. If the given co-author has an `email`, the [Octokit API](https://octokit.github.io) is used to search for the first matching user on that exact email

```ts
import { coAuthorToUsername } from "co-author-to-username";

await coAuthorToUsername({ email: "github@joshuakgoldberg.com" });
// Result: "JoshuaKGoldberg"

await coAuthorToUsername({ username: "JoshuaKGoldberg" });
// Result: "JoshuaKGoldberg"
```

If no corresponding username is found, the function resolves with `undefined`.

#### `coAuthorToUsername` Options

`coAuthorToUsername` may take in an optional options object with a `fetcher` property.
`fetcher` can be either an `Octokit` or your own function to take in an `email: string` and return a `Promise<string | undefined>` for the equivalent email.
This can be useful if you want to use your own caching fetcher and/or stub out network requests in tests.

```ts
await coAuthorToUsername(
	{ email: "mock-data@example.com" },
	{ fetcher: async (email) => email.split("@")[0] },
);
// Result: "mock-data"
```

### `createCachingCoAuthorToUsername`

As a convenience, this package also exports a `createCachingCoAuthorToUsername` that can be used to create a version of `coAuthorToUsername` that caches its email lookups.
It uses a `CachedFactory` from the [`cached-factory` package](https://github.com/JoshuaKGoldberg/cached-factory) to store results keyed by emails.

```ts
import { createCachingCoAuthorToUsername } from "co-author-to-username";

const cachingCoAuthorToUsername = createCachingCoAuthorToUsername();

await cachingCoAuthorToUsername({ email: "github@joshuakgoldberg.com" });
// Result: "JoshuaKGoldberg" (via a network request)

await cachingCoAuthorToUsername({ email: "github@joshuakgoldberg.com" });
// Result: "JoshuaKGoldberg" (cached)
```

Note that the `cachingCoAuthorToUsername` functions created by `createCachingCoAuthorToUsername` cannot be given options.
`createCachingCoAuthorToUsername` must be given any options.

#### `createCachingCoAuthorToUsername` Options

`createCachingCoAuthorToUsername` may take in an optional options object with a `fetcher` property.
It works the same and serves similar purposes to `coAuthorToUsername`'s `fetcher`.

```ts
const cachingCoAuthorToUsername = createCachingCoAuthorToUsername({
	fetcher: async (email) => email.split("@")[0],
});

await cachingCoAuthorToUsername({ email: "mock-data@example.com" });
// Result: "mock-data" (via the fetcher option)

await cachingCoAuthorToUsername({ email: "mock-data@example.com" });
// Result: "mock-data" (cached)
```

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
<!-- (this will be filled in by all-contributors) -->
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💙 This package was templated with [create-typescript-app](https://github.com/JoshuaKGoldberg/create-typescript-app).

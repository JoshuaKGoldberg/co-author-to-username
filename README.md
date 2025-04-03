<h1 align="center">co-author-to-username</h1>

<p align="center">
	Fetches the GitHub username for a co-author, if possible.
	📇
</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/JoshuaKGoldberg/co-author-to-username/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/JoshuaKGoldberg/co-author-to-username" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/JoshuaKGoldberg/co-author-to-username?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/JoshuaKGoldberg/co-author-to-username/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg" /></a>
	<a href="http://npmjs.com/package/co-author-to-username" target="_blank"><img alt="📦 npm version" src="https://img.shields.io/npm/v/co-author-to-username?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
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

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 📇

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg"/><br /><sub><b>Josh Goldberg</b></sub></a><br /><a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a> <a href="https://github.com/JoshuaKGoldberg/co-author-to-username/issues?q=author%3AJoshuaKGoldberg" title="Bug reports">🐛</a> <a href="https://github.com/JoshuaKGoldberg/co-author-to-username/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="https://github.com/JoshuaKGoldberg/co-author-to-username/pulls?q=is%3Apr+reviewed-by%3AJoshuaKGoldberg" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/JoshuaKGoldberg/co-author-to-username/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#infra-JoshuaKGoldberg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#content-JoshuaKGoldberg" title="Content">🖋</a> <a href="#ideas-JoshuaKGoldberg" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [Bingo engine](https://create.bingo).

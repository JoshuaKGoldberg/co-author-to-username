import { describe, expect, it, vi } from "vitest";

import { coAuthorToUsername } from "./coAuthorToUsername.js";

const login = "abc123";

const mockCollectUserByEmail = vi.fn();

vi.mock("./collectUserByEmail.js", () => ({
	get collectUserByEmail() {
		return mockCollectUserByEmail;
	},
}));

const mockRequest = vi.fn();

class MockOctokit {
	request = mockRequest;
}

vi.mock("octokit", () => {
	return {
		get Octokit() {
			return MockOctokit;
		},
	};
});

describe("coAuthorToUsername", () => {
	it("returns the username when coAuthor has one", async () => {
		const actual = await coAuthorToUsername({ username: login });

		expect(actual).toEqual(login);
	});

	it("fetches the email with a new Octokit when coAuthor has email and no fetcher option is provided", async () => {
		const email = "abc@def.ghi";

		mockCollectUserByEmail.mockResolvedValueOnce(login);

		const actual = await coAuthorToUsername({ email });

		expect(actual).toEqual(login);
		expect(mockCollectUserByEmail).toHaveBeenCalledWith(
			email,
			expect.any(MockOctokit),
		);
	});

	it("fetches the email with the fetcher when coAuthor has email and a fetcher option is provided", async () => {
		const email = "abc@def.ghi";
		const fetcher = vi.fn();

		mockCollectUserByEmail.mockResolvedValueOnce(login);

		const actual = await coAuthorToUsername({ email }, { fetcher });

		expect(actual).toEqual(login);
		expect(mockCollectUserByEmail).toHaveBeenCalledWith(email, fetcher);
	});

	it("returns undefined when the coAuthor has neither email nor username", async () => {
		const actual = await coAuthorToUsername({});

		expect(actual).toBeUndefined();
	});
});

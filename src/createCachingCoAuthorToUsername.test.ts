import { describe, expect, it, vi } from "vitest";

import { createCachingCoAuthorToUsername } from "./createCachingCoAuthorToUsername.js";

const login = "abc123";

const mockRequest = vi.fn().mockResolvedValue({
	data: {
		items: [{ login }],
	},
});

vi.mock("octokit", () => {
	return {
		Octokit: class MockOctokit {
			request = mockRequest;
		},
	};
});

describe("createCachingCoAuthorToUsername", () => {
	it("returns a function that uses a new Octokit when no fetcher option is provided", async () => {
		const coAuthorToUsername = createCachingCoAuthorToUsername();

		const username = await coAuthorToUsername({ email: "abc@def.ghi" });

		expect(username).toBe("abc123");
	});

	it("returns a function that uses the fetcher when an fetcher is provided", async () => {
		const coAuthorToUsername = createCachingCoAuthorToUsername({
			fetcher: vi.fn().mockResolvedValue(login),
		});

		const username = await coAuthorToUsername({ email: "abc@def.ghi" });

		expect(username).toBe("abc123");
	});
});

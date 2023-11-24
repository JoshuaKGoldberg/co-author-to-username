import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";

import { collectUserByEmail } from "./collectUserByEmail.js";

const login = "abc123";

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

describe("collectUserByEmail", () => {
	it("searches with a function when fetcher is a non-Octokit function", async () => {
		const fetcher = (email: string) => Promise.resolve(email.split("@")[0]);

		const actual = await collectUserByEmail("abc@def.ghi", fetcher);

		expect(actual).toBe("abc");
	});

	it("searches with an Octokit when fetcher is an Octokit", async () => {
		const fetcher = new MockOctokit();

		mockRequest.mockResolvedValue({
			data: {
				items: [{ login }],
			},
		});

		const actual = await collectUserByEmail(
			"abc@def.ghi",
			fetcher as unknown as Octokit,
		);

		expect(actual).toEqual(login);
	});
});

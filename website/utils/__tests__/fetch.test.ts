import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { $fetch } from "../fetch";

vi.mock("../safe-cookie-storage", () => ({
  safeCookieStorage: {
    getItem: vi.fn(() => "test-token"),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("$fetch", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.clearAllMocks();
  });

  it("adds Authorization header when token present", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ hello: "world" }),
    });

    const result = await $fetch("/api/v1/me", { isToast: false });

    const call = (globalThis.fetch as any).mock.calls[0];
    expect(call[1].headers.Authorization).toBe("Bearer test-token");
    expect(result.json).toEqual({ hello: "world" });
  });

  it("returns response and json on error", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: "bad" }),
    });

    const result = await $fetch("/api/v1/me", { isToast: false });
    expect(result.response.status).toBe(400);
    expect(result.json).toEqual({ message: "bad" });
  });

  it("does not crash on non-JSON body", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: async () => { throw new Error("no body"); },
    });

    const result = await $fetch("/api/v1/x", { isToast: false });
    expect(result.json).toBeUndefined();
  });
});

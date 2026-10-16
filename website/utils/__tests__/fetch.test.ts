import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { $fetch } from "../fetch";

describe("$fetch", () => {
  const original = globalThis.fetch;
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    globalThis.fetch = original;
    vi.clearAllMocks();
  });

  it("returns response and json", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ hello: "world" }),
    });
    const r = await $fetch("/api/v1/notes", { isToast: false });
    expect(r.response?.status).toBe(200);
    expect(r.json).toEqual({ hello: "world" });
  });

  it("survives non-json bodies", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 204,
      json: async () => { throw new Error("no body"); },
    });
    const r = await $fetch("/api/v1/notes", { isToast: false });
    expect(r.json).toBeUndefined();
  });

  it("passes method and body through", async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({}),
    });
    await $fetch("/api/v1/notes", {
      method: "POST",
      body: JSON.stringify({ title: "x" }),
      headers: { "Content-Type": "application/json" },
      isToast: false,
    });
    const call = (globalThis.fetch as any).mock.calls[0];
    expect(call[1].method).toBe("POST");
    expect(call[1].headers["Content-Type"]).toBe("application/json");
  });
});

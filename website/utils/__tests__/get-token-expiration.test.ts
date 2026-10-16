import { describe, it, expect } from "vitest";
import { getTokenExpiration } from "../get-token-expiration";

function fakeJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${header}.${body}.sig`;
}

describe("getTokenExpiration", () => {
  it("returns ms timestamp from exp claim", () => {
    const token = fakeJwt({ exp: 1_700_000_000 });
    expect(getTokenExpiration(token)).toBe(1_700_000_000_000);
  });

  it("returns null when exp is missing", () => {
    expect(getTokenExpiration(fakeJwt({ sub: "x" }))).toBeNull();
  });

  it("returns null on malformed token", () => {
    expect(getTokenExpiration("not.a.jwt")).toBeNull();
    expect(getTokenExpiration("")).toBeNull();
  });
});

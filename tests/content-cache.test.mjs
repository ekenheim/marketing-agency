import assert from "node:assert/strict";
import { test } from "node:test";
import { createContentCache } from "../src/lib/content-cache.ts";

test("navigation reuses successful reads without sharing caller mutations", async () => {
  const read = createContentCache();
  let calls = 0;
  const load = async () => { calls++; return { image: { url: "/uploads/photo.jpg" } }; };
  const first = await read("/global?locale=en", load);
  first.image.url = "https://example.com/uploads/photo.jpg";
  assert.equal((await read("/global?locale=en", load)).image.url, "/uploads/photo.jpg");
  assert.equal(calls, 1);
});

test("concurrent page and layout reads share one request but get separate objects", async () => {
  const read = createContentCache();
  let calls = 0;
  let resolve;
  const response = new Promise((done) => { resolve = done; });
  const load = () => { calls++; return response; };
  const first = read("global", load);
  const second = read("global", load);
  resolve({ phone: "123" });
  const [a, b] = await Promise.all([first, second]);
  assert.equal(calls, 1);
  assert.notEqual(a, b);
  assert.deepEqual(a, b);
});

test("French and English content never share cache entries", async () => {
  const read = createContentCache();
  assert.equal(await read("/services?locale=en", async () => "English"), "English");
  assert.equal(await read("/services?locale=fr", async () => "Français"), "Français");
});

test("expired responses are reloaded and cannot resurrect unpublished content", async () => {
  const read = createContentCache(0);
  await read("post", async () => ({ data: [{ title: "Published" }] }));
  assert.deepEqual(await read("post", async () => ({ data: [] })), { data: [] });
  await assert.rejects(read("post", async () => { throw new Error("CMS offline"); }), /CMS offline/);
});

test("failed requests are retried instead of cached", async () => {
  const read = createContentCache();
  await assert.rejects(read("global", async () => { throw new Error("offline"); }), /offline/);
  assert.equal(await read("global", async () => "recovered"), "recovered");
});

test("cache capacity is bounded", async () => {
  const read = createContentCache(15_000, 2);
  await read("one", async () => 1);
  await read("two", async () => 2);
  await read("three", async () => 3);
  assert.equal(await read("one", async () => 4), 4);
});

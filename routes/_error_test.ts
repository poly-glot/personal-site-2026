import { assertEquals } from "@std/assert";
import { HttpError } from "fresh";

Deno.test("HttpError 404 carries status 404", () => {
  const err = new HttpError(404);
  assertEquals(err.status, 404);
  assertEquals(err instanceof HttpError, true);
});

Deno.test("HttpError 500 carries status 500", () => {
  const err = new HttpError(500);
  assertEquals(err.status, 500);
});

Deno.test("non-HttpError is not an HttpError", () => {
  const err = new Error("unexpected");
  assertEquals(err instanceof HttpError, false);
});

function errorMessage(status: number): string {
  return status === 404 ? "Page not found." : "Something went wrong.";
}

Deno.test("status/message mapping: 404 -> Page not found.", () => {
  assertEquals(errorMessage(404), "Page not found.");
});

Deno.test("status/message mapping: 500 -> Something went wrong.", () => {
  assertEquals(errorMessage(500), "Something went wrong.");
});

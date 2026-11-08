import { describe, expect, it } from "vitest";
import { normalizeIsraeliPhone, requestSchema } from "./schema";

const valid = {
  eventType: "birthday",
  locationType: "studio",
  city: "",
  preferredDate: "2026-12-10",
  alternativeDate: "",
  childAge: "7",
  kidsCount: "15",
  parentName: "  דנה כהן ",
  phone: "054-123 4567",
  email: "Dana@Example.com",
  callTime: "",
  notes: "",
  consent: "on",
};

describe("normalizeIsraeliPhone", () => {
  it.each([
    ["054-1234567", "0541234567"],
    ["+972 54 123 4567", "0541234567"],
    ["972541234567", "0541234567"],
    ["03-6123456", "036123456"],
    ["077-1234567", "0771234567"],
  ])("accepts %s", (input, expected) => {
    expect(normalizeIsraeliPhone(input)).toBe(expected);
  });

  it.each(["12345", "054123456", "05412345678", "abc", ""])("rejects %s", (input) => {
    expect(normalizeIsraeliPhone(input)).toBeNull();
  });
});

describe("requestSchema", () => {
  it("cleans up a valid request", () => {
    const result = requestSchema.parse(valid);
    expect(result).toMatchObject({
      parentName: "דנה כהן",
      phone: "0541234567",
      email: "dana@example.com",
      childAge: 7,
      kidsCount: 15,
      city: null,
      alternativeDate: null,
      notes: null,
    });
  });

  it("requires a city when the event is at the customer's place", () => {
    const result = requestSchema.safeParse({ ...valid, locationType: "customer" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["city"]);
  });

  it("requires consent", () => {
    expect(requestSchema.safeParse({ ...valid, consent: "" }).success).toBe(false);
  });

  it("rejects unknown event types and bad numbers", () => {
    expect(requestSchema.safeParse({ ...valid, eventType: "wedding" }).success).toBe(false);
    expect(requestSchema.safeParse({ ...valid, kidsCount: "-3" }).success).toBe(false);
    expect(requestSchema.safeParse({ ...valid, childAge: "seven" }).success).toBe(false);
  });
});

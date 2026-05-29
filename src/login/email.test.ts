import { describe, it, expect } from "vitest"
import { isOrgEmail } from "./email"

describe("isOrgEmail", () => {
  it("returns true for exact Touchstone domains", () => {
    expect(isOrgEmail("user@mit.edu")).toBe(true)
    expect(isOrgEmail("user@csail.mit.edu")).toBe(true)
    expect(isOrgEmail("user@sloan.mit.edu")).toBe(true)
    expect(isOrgEmail("user@media.mit.edu")).toBe(true)
  })

  it("is case-insensitive", () => {
    expect(isOrgEmail("user@MIT.EDU")).toBe(true)
    expect(isOrgEmail("user@CSAIL.MIT.EDU")).toBe(true)
  })

  it("returns false for non-MIT domains", () => {
    expect(isOrgEmail("user@gmail.com")).toBe(false)
    expect(isOrgEmail("user@harvard.edu")).toBe(false)
  })

  it("returns false for alum.mit.edu (not a Touchstone domain)", () => {
    expect(isOrgEmail("user@alum.mit.edu")).toBe(false)
  })

  it("returns false for unlisted mit.edu subdomains", () => {
    expect(isOrgEmail("user@some-lab.mit.edu")).toBe(false)
  })

  it("returns false for empty or invalid input", () => {
    expect(isOrgEmail("")).toBe(false)
    expect(isOrgEmail("notanemail")).toBe(false)
    expect(isOrgEmail("   ")).toBe(false)
    expect(isOrgEmail("@mit.edu")).toBe(false)
  })
})

import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("@/lib/api-client", () => ({
  apiClient: vi.fn(),
}));

import { apiClient } from "@/lib/api-client";
import { personService } from "@/services/person.service";

describe("personService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("search builds query string from params", async () => {
    vi.mocked(apiClient).mockResolvedValue({ records: [], total: 0 });

    await personService.search({ q: "duong", page: 2, limit: 10 });

    expect(apiClient).toHaveBeenCalledWith(
      "/user-admin?q=duong&page=2&limit=10",
    );
  });

  it("create posts person payload", async () => {
    const payload = {
      familyId: "family-1",
      firstName: "Nguyen",
      lastName: "Duong",
      gender: "MALE" as const,
      birth_date: "1999-10-30",
    };
    vi.mocked(apiClient).mockResolvedValue({ id: "p1", ...payload });

    await personService.create(payload);

    expect(apiClient).toHaveBeenCalledWith("/user-admin", {
      method: "POST",
      body: payload,
    });
  });

  it("deactivate soft-deletes via status false", async () => {
    vi.mocked(apiClient).mockResolvedValue({ id: "p1", status: false });

    await personService.deactivate("p1");

    expect(apiClient).toHaveBeenCalledWith("/user-admin/p1", {
      method: "PATCH",
      body: { status: false },
    });
  });
});

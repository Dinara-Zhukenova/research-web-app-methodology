import type { Comparison, Measurement, MeasurementInput, MeasurementList } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!response.ok) throw new Error(`API ${response.status}: ${await response.text()}`);
  return (response.status === 204 ? undefined : await response.json()) as T;
}

export const api = {
  list(q = "", mode = "", sortBy = "measured_at", sortOrder = "desc", page = 1, size = 10) {
    const params = new URLSearchParams({
      limit: String(size),
      offset: String((page - 1) * size),
      sort_by: sortBy,
      sort_order: sortOrder,
    });
    if (q) params.set("q", q);
    if (mode) params.set("mode", mode);
    return request<MeasurementList>(`/measurements?${params}`);
  },
  async get(id: number): Promise<Measurement | null> {
    const response = await fetch(`${API_URL}/measurements/${id}`, { cache: "no-store" });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`API ${response.status}`);
    return response.json();
  },
  comparison: () => request<Comparison>("/measurements/comparison"),
  create: (data: MeasurementInput) =>
    request<Measurement>("/measurements", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<MeasurementInput>) =>
    request<Measurement>(`/measurements/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: number) => request<void>(`/measurements/${id}`, { method: "DELETE" }),
};

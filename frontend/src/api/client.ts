export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  return res.json();
}
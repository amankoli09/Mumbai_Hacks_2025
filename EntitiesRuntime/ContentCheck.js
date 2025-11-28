// In-memory mock for local dev
let checks = [];
let idSeq = 1;

export const ContentCheck = {
  async create(data) {
    const now = new Date().toISOString();
    const item = { id: String(idSeq++), created_date: now, ...data };
    checks.unshift(item);
    return item;
  },
  async list(sort = "-created_date", limit = 50) {
    const sorted = [...checks].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    return sorted.slice(0, limit);
  },
  async filter(query = {}, sort = "-created_date", limit = 50) {
    const filtered = checks.filter(c => Object.entries(query).every(([k, v]) => c[k] === v));
    const sorted = [...filtered].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    return sorted.slice(0, limit);
  }
};

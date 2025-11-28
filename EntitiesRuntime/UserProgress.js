let progresses = [];
let idSeq = 1;

export const UserProgress = {
  async filter(query = {}) {
    return progresses.filter(p => Object.entries(query).every(([k, v]) => p[k] === v));
  },
  async create(data) {
    const now = new Date().toISOString();
    const item = { id: String(idSeq++), created_date: now, ...data };
    progresses.push(item);
    return item;
  },
  async update(id, patch) {
    const idx = progresses.findIndex(p => p.id === id);
    if (idx !== -1) {
      progresses[idx] = { ...progresses[idx], ...patch };
      return progresses[idx];
    }
    return null;
  }
};

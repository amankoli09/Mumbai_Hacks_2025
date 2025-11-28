let reports = [];
let idSeq = 1;
export const UserReport = {
  async create(data){
    const now = new Date().toISOString();
    const item = { id: String(idSeq++), created_date: now, ...data };
    reports.push(item);
    return item;
  }
}

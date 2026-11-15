import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, '../data/database.json');

class RelationalDB {
  constructor() {
    this.data = {
      users: [],
      lawyers: [],
      laws: [],
      appointments: [],
      messages: [],
      cases: [],
      reviews: [],
      saved_items: [],
      articles: [],
      dictionary: [],
      checklists: [],
      emergency_resources: [],
      audit_logs: []
    };
    this.isLoaded = false;
    this.saveTimeout = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        this.saveSync();
      }
      this.isLoaded = true;
    } catch (err) {
      console.error('Error loading database:', err);
      this.saveSync();
      this.isLoaded = true;
    }
  }

  saveSync() {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write database file synchronously:', err);
    }
  }

  saveAsync() {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      try {
        const dir = path.dirname(DB_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
      } catch (err) {
        console.error('Failed to write database file asynchronously:', err);
      }
    }, 150);
  }

  // Generic collection operations
  getCollection(table) {
    if (!this.data[table]) {
      this.data[table] = [];
    }
    return this.data[table];
  }

  find(table, predicate = () => true) {
    const col = this.getCollection(table);
    if (typeof predicate === 'function') {
      return col.filter(predicate);
    }
    // simple object match
    return col.filter(item => {
      for (const [key, val] of Object.entries(predicate)) {
        if (item[key] !== val) return false;
      }
      return true;
    });
  }

  findOne(table, predicate) {
    const results = this.find(table, predicate);
    return results.length > 0 ? results[0] : null;
  }

  findById(table, id) {
    const col = this.getCollection(table);
    // string or numeric match
    return col.find(item => String(item.id) === String(id)) || null;
  }

  insert(table, item) {
    const col = this.getCollection(table);
    const now = new Date().toISOString();
    const newRecord = {
      ...item,
      id: item.id || (col.length > 0 ? Math.max(...col.map(x => typeof x.id === 'number' ? x.id : 0), 0) + 1 : 1),
      created_at: item.created_at || now,
      updated_at: now
    };
    col.push(newRecord);
    this.saveAsync();
    return newRecord;
  }

  update(table, id, updates) {
    const col = this.getCollection(table);
    const index = col.findIndex(item => String(item.id) === String(id));
    if (index === -1) return null;

    const updated = {
      ...col[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    col[index] = updated;
    this.saveAsync();
    return updated;
  }

  delete(table, id) {
    const col = this.getCollection(table);
    const index = col.findIndex(item => String(item.id) === String(id));
    if (index === -1) return false;

    col.splice(index, 1);
    this.saveAsync();
    return true;
  }

  count(table, predicate = () => true) {
    return this.find(table, predicate).length;
  }

  // Audit Logging helper
  logAudit(userId, action, targetType, targetId, details, ip = '127.0.0.1') {
    return this.insert('audit_logs', {
      user_id: userId,
      action,
      target_type: targetType,
      target_id: targetId,
      details,
      ip_address: ip,
      created_at: new Date().toISOString()
    });
  }
}

export const db = new RelationalDB();

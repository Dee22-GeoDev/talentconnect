
/**
 * Supabase adapter — maps common supabase client patterns used in this project
 * to REST calls to the Express API server at /api.
 *
 * This is a lightweight shim implementing:
 *  - supabase.auth.signUp / signIn / signOut / user / getSession
 *  - supabase.from(table).select(...).eq(...).order(...).single().insert().update().delete()
 *
 * NOTE: adjust API_BASE if your server runs on a different host/port.
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

class QueryBuilder {
  constructor(table) {
    this.table = table;
    this._select = '*';
    this._filters = [];
    this._order = null;
    this._limit = null;
    this._single = false;
  }

  select(cols = '*') {
    this._select = cols;
    return this;
  }

  eq(field, value) {
    this._filters.push([field, value]);
    return this;
  }

  order(field, opts = {}) {
    this._order = { field, opts };
    return this;
  }

  limit(n) {
    this._limit = n;
    return this;
  }

  single() {
    this._single = true;
    return this;
  }

  async _execFetch(method='GET', body=null) {
    // map simple query to REST endpoints in the server
    // supported tables: jobs, talents, applications, users (if exists)
    const base = API_BASE.replace(/\/api$/, '');
    let url = `${base}/${this.table}`;
    const params = new URLSearchParams();

    if (this._filters.length) {
      // only supports equality filters; multiple filters become repeated query params
      this._filters.forEach(([f,v]) => params.append(f, String(v)));
    }
    if (this._order) {
      params.append('_orderField', this._order.field);
      if (this._order.opts && this._order.opts.ascending === false) params.append('_orderDir', 'desc');
    }
    if (this._limit) params.append('_limit', String(this._limit));
    if (this._select && this._select !== '*') params.append('_select', this._select);

    const query = params.toString();
    if (method === 'GET' && query) url += '?' + query;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!res.ok) {
      const text = await res.text();
      let err = text;
      try { err = JSON.parse(text); } catch(e){}
      const error = new Error(err && err.error ? err.error : res.statusText);
      error.status = res.status;
      throw error;
    }
    const data = await res.json();
    return { data, error: null };
  }

  // public actions
  async insert(payload) {
    return this._execFetch('POST', payload);
  }

  async update(payload) {
    // if _filters includes 'id' we can update the single item
    if (this._filters.length === 1 && this._filters[0][0] === 'id') {
      const id = this._filters[0][1];
      const res = await fetch(`${API_BASE.replace(/\/api$/,'')}/${this.table}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const t = await res.text();
        const e = new Error(t || res.statusText);
        e.status = res.status;
        throw e;
      }
      const data = await res.json();
      return { data, error: null };
    } else {
      // fall back to bulk update route if server supports it
      return this._execFetch('PUT', payload);
    }
  }

  async delete() {
    if (this._filters.length === 1 && this._filters[0][0] === 'id') {
      const id = this._filters[0][1];
      const res = await fetch(`${API_BASE.replace(/\/api$/,'')}/${this.table}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
      });
      if (!res.ok) {
        const t = await res.text();
        const e = new Error(t || res.statusText);
        e.status = res.status;
        throw e;
      }
      const data = await res.json();
      return { data, error: null };
    }
    // fallback
    return this._execFetch('DELETE');
  }

  // select executes the GET
  async select() {
    return this._execFetch('GET');
  }
}

export const supabase = {
  from(table) {
    return new QueryBuilder(table);
  },

  auth: {
    async signUp({ email, password, fullName, phone } = {}) {
      const res = await fetch(API_BASE.replace(/\/api$/,'' ) + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, phone }),
      });
      if (!res.ok) {
        const t = await res.text();
        const e = new Error(t || res.statusText);
        e.status = res.status;
        throw e;
      }
      const data = await res.json();
      // server typically returns user object and token
      if (data.token) localStorage.setItem('token', data.token);
      return { user: data.user || null, session: data.token ? { access_token: data.token } : null };
    },

    async signIn({ email, password } = {}) {
      const res = await fetch(API_BASE.replace(/\/api$/,'') + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const t = await res.text();
        const e = new Error(t || res.statusText);
        e.status = res.status;
        throw e;
      }
      const data = await res.json();
      if (data.token) localStorage.setItem('token', data.token);
      return { user: data.user || null, session: data.token ? { access_token: data.token } : null };
    },

    async signOut() {
      localStorage.removeItem('token');
      return { error: null };
    },

    async user() {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const res = await fetch(API_BASE.replace(/\/api$/,'') + '/auth/me', {
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    },

    // helper to get the session token
    async getSession() {
      const token = localStorage.getItem('token');
      return token ? { access_token: token } : null;
    }
  }
};

export default supabase;

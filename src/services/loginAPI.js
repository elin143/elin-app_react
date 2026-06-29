import axios from "axios";

// ==========================
// SUPABASE CONFIG
// ==========================
const SUPABASE_URL = "https://gbzvfstwrillekxyzxvm.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdienZmc3R3cmlsbGVreHl6eHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0NDU2ODMsImV4cCI6MjA5NzAyMTY4M30.qN1qa3N5ZX-X-rxYQ5Y0XmQ9Q_pPDDsIlA7I88Kn8Os";

const LOGIN_TABLE = `${SUPABASE_URL}/rest/v1/login`;

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

export const loginAPI = {
  // ==========================
  // REGISTER
  // ==========================
  async register(data) {
    const { username, password, role = "member", tier = "Regular" } = data;

    if (!username?.trim() || !password?.trim()) {
      throw new Error("Username dan password wajib diisi.");
    }

    // cek username sudah ada atau belum
    const exists = await this.checkUsername(username);

    if (exists) {
      throw new Error("Username sudah digunakan.");
    }

    const payload = {
      username: username.trim(),
      password: password.trim(),
      role,
    };

    try {
      const res = await axios.post(
        LOGIN_TABLE,
        payload,
        { headers }
      );

      return res.data?.[0] || null;
    } catch (err) {
      console.error(err.response?.data || err);
      throw new Error("Gagal mendaftar.");
    }
  },

  // ==========================
  // LOGIN
  // ==========================
  async login(username, password) {
    if (!username?.trim() || !password?.trim()) {
      throw new Error("Username dan password wajib diisi.");
    }

    try {
      const res = await axios.get(
        `${LOGIN_TABLE}?username=eq.${encodeURIComponent(
          username.trim()
        )}&select=*`,
        {
          headers,
        }
      );

      const users = res.data;

      if (!users.length) {
        return null;
      }

      const user = users.find(
        (u) => u.password === password
      );

      return user || null;
    } catch (err) {
      console.error(err.response?.data || err);
      throw new Error("Gagal login.");
    }
  },

  // ==========================
  // CHECK USERNAME
  // ==========================
  async checkUsername(username) {
    try {
      const res = await axios.get(
        `${LOGIN_TABLE}?username=eq.${encodeURIComponent(
          username.trim()
        )}&select=id`,
        {
          headers,
        }
      );

      return res.data.length > 0;
    } catch (err) {
      console.error(err.response?.data || err);
      return false;
    }
  },
};
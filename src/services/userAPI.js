import axios from 'axios'

const API_URL = "https://ldjlujubthlehyhruqfp.supabase.co/rest/v1/users"
const API_KEY = "sb_publishable_Ax35tbMkLxWTxZF1H0jddA_kwjDao2g"

// Header dasar — TANPA Prefer agar tidak menyebabkan error 406
const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
}

export const userAPI = {
    async fetchUsers() {
        const response = await axios.get(`${API_URL}?select=*&order=created_at.desc`, { headers })
        return response.data
    },

    async createUser(data) {
        // Menggunakan return=minimal agar Supabase tidak mengembalikan body (lebih aman)
        await axios.post(API_URL, data, {
            headers: {
                ...headers,
                Prefer: "return=minimal"
            }
        })
    },

    async updateUser(id, data) {
        await axios.patch(`${API_URL}?id=eq.${id}`, data, {
            headers: {
                ...headers,
                Prefer: "return=minimal"
            }
        })
    },

    async deleteUser(id) {
        await axios.delete(`${API_URL}?id=eq.${id}`, { headers })
    }
}

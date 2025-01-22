import axios from 'axios'

const whatsappApi = axios.create({
  baseURL: import.meta.env.VITE_WHATSAPP_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { whatsappApi }

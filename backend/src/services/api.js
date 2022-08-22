// configurações do axios

import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3333" // incluindo a parte da url que se repete em todas as requisições
})


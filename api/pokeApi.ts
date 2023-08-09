import axios from "axios";

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: { "Accept-Encoding": "gzip,deflate,compress" }
})

export default pokeApi;
import axios from 'axios'
let api = axios.create({
    baseURL: "http://api.weatherapi.com/v1/"
})
const weatherApi ={
    get: (city, days)=>api.get(`forecast.json?key=f5625ca58f0e45d5ab4202833210702&q=${city}&days=${days}`) 
}
	

export default weatherApi;

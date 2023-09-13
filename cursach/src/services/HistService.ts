import axios from 'axios';
import {Answer, Order} from "../models/Models";
import authHeader from "../redux/AuthHeader";

const API_URL = "http://localhost:5050/history/"

class HistService {
	getHist() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response)=>{
            console.log(response.data);
            //const data: Answer = response.data;
            const orders: Order[] = response.data;
            return orders;
        })
    }
}

export default new HistService();
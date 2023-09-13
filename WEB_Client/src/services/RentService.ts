import axios from 'axios';
import {Answer, Rent} from "../models/Models";

const API_URL = "http://localhost:5050/rent/"

class RentService{
    rentAdd(rent: Rent){
        return axios.post(API_URL+"add", rent).then((res)=>{
            const data: Answer = res.data;
            return data.status;
        })
    }
}

export default new RentService();


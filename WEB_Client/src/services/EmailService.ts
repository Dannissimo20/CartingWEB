import axios from 'axios';
import {Answer, Email} from "../models/Models";

const API_URL = "http://localhost:8887/profile/"

class EmailService{
    emailChange(email: Email){
        return axios.post(API_URL+"change", email).then((res)=>{
            const data: Answer = res.data;
            return data.status;
        })
    }
}

export default new EmailService();
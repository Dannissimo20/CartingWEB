import axios from 'axios';
import {Answer, Event} from "../models/Models";
import authHeader from "../redux/AuthHeader";

const API_URL = "http://localhost:5050/event/"

class EventService{
    eventAdd(event: Event){
        return axios.post(API_URL+"add", event, {headers: authHeader()}).then((res)=>{
            const data: Answer = res.data;
            return data.status;
        })
    }
}

export default new EventService();
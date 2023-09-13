import axios from 'axios';
import {Answer, Event} from "../models/Models";
import authHeader from "../redux/AuthHeader";

const API_URL = "http://localhost:5050/event/"

class EventGetService {
	getEvents() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response)=>{
            console.log(response.data);
            //const data: Answer = response.data;
            const events: Event[] = response.data;
            return events;
        })
    }
}

export default new EventGetService();
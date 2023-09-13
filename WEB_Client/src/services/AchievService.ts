import axios from 'axios';
import {Answer, Achievement} from "../models/Models";
import authHeader from "../redux/AuthHeader";

const API_URL = "http://localhost:5050/achiev/"

class AchievService {
	getAchiev() {
		return axios.get(API_URL + "get", {headers: authHeader()})
        .then((response)=>{
            console.log(response.data);
            //const data: Answer = response.data;
            const achievements: Achievement[] = response.data;
            return achievements;
        })
    }
}

export default new AchievService();
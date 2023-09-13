import Client from "./ClientModel";

declare type Answer = {
	status:string,
	access_token:string,
	user:Client
}

export default Answer;
import { Message } from './message';

export interface MessagesResponse {
	error: boolean;
	messages: Message[];
	blocked : boolean
	blocked_by : any;
}

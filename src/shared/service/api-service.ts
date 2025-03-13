import { IResponse } from "../types";
import { ErrorState } from "./error";

export class ApiService {
    static URL = 'https://jsonplaceholder.typicode.com/comments?q=';
    static async fetchComments(query: string): Promise<Array<IResponse> | ErrorState> {
        try {
            const response = await fetch(`${ApiService.URL}${query}`);
            const data: Array<IResponse> = await response.json() as Array<IResponse>;
            return Promise.resolve(data);
        } catch (e) {
            console.log(e);
            return new ErrorState("Error fetching api data", 500);
        }
    }
}

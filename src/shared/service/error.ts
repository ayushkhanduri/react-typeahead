export class ErrorState {
    message: string;
    status: number;

    constructor(m: string, s: number) {
        this.message = m;
        this.status = s;
    }
}

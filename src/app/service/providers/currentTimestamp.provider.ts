import { TimestampProvider } from "rxjs";

export class CurrentTimestampProvider implements TimestampProvider{
    //Set initialDate
    initialDate:number = Date.now();
    //Returns current timestamp in microseconds
    now(){
        return this.initialDate + performance.now();
    }
}

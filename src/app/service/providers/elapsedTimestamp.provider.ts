import { TimestampProvider } from "rxjs";

export class ElapsedTimestampProvider implements TimestampProvider{
    //Returns timestamp since app start in microseconds
    now(){
        return performance.now();
    }
}

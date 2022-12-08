import { TimestampProvider } from "rxjs";

export class GameTimestampProvider implements TimestampProvider{
    
    // Set the origin date for the game in miliseconds since 01/01/1970 00:00:00, eg:
    // launchDate = 0 -> 01/01/1970 00:00:00
    // launchDate = 1577836800000 -> 01/01/2020 00:00:00
    launchDate: number = 1636409142000;
                         
    
    // Set initialGameDate in miliseconds away from 01/01/1970 00:00:00, eg:
    // initialGameDate = 0 -> 01/01/1970 00:00:00
    // initialGameDate = 31536000000 -> 01/01/1971 00:00:00 - one year ahead
    // initialDate = -6622560000000 -> 01/01/1760 00:00:00 - 210 years before
    initialGameDate: number = -6622560000000;
                                
    //Speed that gameDate will be updated
    gameSpeed: number = 24;

    //System date at app start
    initialDate:number = Date.now();

    //Returns a game date in microseconds since initialDate at custom game speed:
    now() {
        return (this.initialDate + performance.now() - this.launchDate) * this.gameSpeed + this.initialGameDate;
    }
}

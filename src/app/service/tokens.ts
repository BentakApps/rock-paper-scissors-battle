import { InjectionToken } from "@angular/core";
import { TimestampProvider } from "rxjs";

export const TIMESTAMP_PROVIDER = new InjectionToken<TimestampProvider>('timestamp-provider');
import { WS } from "../../ws";
import { Transport } from "../base";
import { Interceptor, ICourierMessage } from "../types";
import { ITransportOptions } from "./types";
export declare class CourierTransport extends Transport {
  protected ws: WS;
  protected clientKey: string;
  protected userSignature?: string;
  protected interceptor?: Interceptor;
  constructor(options: ITransportOptions);
  send(message: ICourierMessage): void;
  subscribe(channel: string, event?: string): void;
  unsubscribe(channel: string, event?: string): void;
}
//# sourceMappingURL=index.d.ts.map

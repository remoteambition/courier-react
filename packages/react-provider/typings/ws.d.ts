import { ICourierEventCallback } from "./transports/types";
import ReconnectingWebSocket from "reconnecting-websocket";
export declare class WS {
  connection?: ReconnectingWebSocket;
  private subscriptions;
  protected connected: any;
  protected messageCallback: any;
  private url;
  private clientKey;
  constructor({ url, clientKey }: { url: string; clientKey: string });
  connect(): void;
  onClose(): void;
  onOpen(): void;
  onMessage({ data }: { data: string }): void;
  subscribe(
    channel: string,
    event: string,
    callback: ICourierEventCallback
  ): Promise<void>;
  send(message: { [key: string]: any }): void;
  unsubscribe(channel: string, event: string): void;
  close(): void;
}
//# sourceMappingURL=ws.d.ts.map

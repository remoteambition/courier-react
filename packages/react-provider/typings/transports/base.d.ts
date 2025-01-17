import { ICourierEvent, Interceptor } from "./types";
export declare class Transport {
  constructor();
  /** Callback for emitted events  */
  protected listeners: Array<{
    id: string;
    listener: (courierEvent: ICourierEvent) => void;
  }>;
  protected interceptor?: Interceptor;
  /** Wrapper method for emitted events  */
  protected emit: (courierEvent: ICourierEvent) => void;
  /** Setter method for a listener */
  listen: (listener: {
    id: string;
    listener: (courierEvent: ICourierEvent) => void;
  }) => void;
  intercept: (cb: Interceptor) => void;
}
//# sourceMappingURL=base.d.ts.map

import React from "react";
import { ICourierProviderProps, ICourierContext, Brand } from "./types";
import { ICourierMessage, ITextBlock, IActionBlock } from "./transports/types";
export * from "./transports";
export * from "./hooks";
export declare const registerReducer: (scope: any, reducer: any) => void;
export type {
  Brand,
  ITextBlock,
  IActionBlock,
  ICourierMessage,
  ICourierContext,
};
export declare const CourierContext: React.Context<ICourierContext | undefined>;
export declare const CourierProvider: React.FunctionComponent<ICourierProviderProps>;
//# sourceMappingURL=index.d.ts.map

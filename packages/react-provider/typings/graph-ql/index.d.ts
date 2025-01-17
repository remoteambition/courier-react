import { Client } from "urql";
export declare class GraphQLClient {
  client?: Client;
  constructor({
    clientKey,
    userId,
    userSignature,
    apiUrl,
  }: {
    clientKey?: string;
    userId?: string;
    userSignature?: string;
    apiUrl?: string;
  });
  query(
    queryString: any,
    variables: any
  ): Promise<import("urql").OperationResult<any, any>> | undefined;
  mutate(
    mutateString: any,
    variables: any
  ): Promise<import("urql").OperationResult<any, any>> | undefined;
}
export default GraphQLClient;
//# sourceMappingURL=index.d.ts.map

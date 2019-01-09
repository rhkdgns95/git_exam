// export const typeDefs = ["type Query {\n  sayBye: String!\n  sayHello(n: String!): Greeting!\n}\n\ntype Greeting {\n  text: String!\n  error: Boolean!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: string;
  sayHello: Greeting;
}

export interface SayHelloQueryArgs {
  n: string;
}

export interface Greeting {
  text: string;
  error: boolean;
}

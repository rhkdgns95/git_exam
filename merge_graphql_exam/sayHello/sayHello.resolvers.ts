import { Greeting, SayHelloQueryArgs } from "../../../types/graph";

const resolvers = {
    Query: {
        sayHello:(_, prop: SayHelloQueryArgs ): Greeting =>{
            return {
                text:`Hello, ${prop.n}`,
                error:false
            }
        } 
    }
}

export default resolvers;
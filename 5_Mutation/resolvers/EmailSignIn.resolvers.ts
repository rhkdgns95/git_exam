// Args. email, password
// 1. email이 존재하는 유저를 DB에서 찾는다. 존재하지 않으면 리턴
// 2. 존재한다면 입력받은 패스워드와 저장된 해쉬패스워드를 비교한다. 존재하거나 틀리면 리턴.

import { EmailSignInResponse, EmailSignInMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import User from "../../../entities/User";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignIn: async(_, args:EmailSignInMutationArgs): Promise<EmailSignInResponse> => {
			const {email, password} = args;
			try {
				const user = await User.findOut({email});
				if(!user){
					return {
						ok: false,
						error: "No user found that email",
						token: null
					};
				}
				const checkPassword = await user.comparePassword(password);
				if(checkPassword){
					const token = createJWT(user.id);
					return {
						ok: true,
						error: null,
						token
					};
				} else {
					return {
						ok: false,
						error: "Wrong Password",
						token: null
					};
				}	
			} catch(err){
				return {
					ok: false,
					error: err.message,
					token: null
				}
			}
		}
	}
}

export default resolvers;
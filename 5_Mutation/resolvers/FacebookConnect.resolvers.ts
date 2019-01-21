// Args. firstName, lastName, email, fbId 
// 1. fbId를 갖는 User를 DB에서 찾은뒤 존재하면 리턴
// 2. (존재하지 않을경우) 새로운 유저 생성 후(페이스북 프로필 등록한 뒤) 리턴
import { FacebookConnectResponse, FacebookConnectMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import User from "../../../entities/User";

const resolvers: Resolvers = {
	Mutation: {
		FacebookConnect: async(_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
			const { fbId } = args;
			try{
				const existUser = await User.findOut({fbId});
				if(existUser) {
					const token = createJWT(existUser.id);
					return {
						ok: true,
						error: null,
						token
					};
				}
			} catch (err){
				return {
					ok: false,
					error: err.message,
					token: null
				};
			}

			try{
				const newUser = await User.create({ 
						...args,
						profilePhoto: `https://graph.facebook.com/${fbId}/picture?type=square`
						}).save();
				const token = createJWT(newUser.id);
				return {
					ok: true,
					error: null,
					token
				}
			} catch (err){
				return {
					ok: false,
					error: err.message,
					token: null
				};
			}
		}
	}
}

export default resolvers;
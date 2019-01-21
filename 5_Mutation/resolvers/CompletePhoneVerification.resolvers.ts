// Args. phoneNumber, key
// 1. 입력받은 휴대전화번호와 키값을 Verification 테이블에 존재하는지 확인 => 없다면 리턴,
// 2. 존재한다면, verified속성을 true로 하여 저장.
// 3. 입력받은 휴대전화번호를 갖는 user가있는지 User테이블에서 확인 => 없어도 인증이 되었으므로 true를하고 token과 error는 null로한다.
// 4. 존재한다면, verifiedPhoneNumber속성을 true로 하여 저장한뒤 리턴.

import { CompletePhoneVerificationResponse, CompletePhoneVerificationMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
	Mutation: {
		CompletePhoneVerification: async (_, args: CompletePhoneVerificationMutationArgs): Promise<CompletePhoneVerificationResponse> => {
			const = { phoneNumber, key } = args;
			try {
				const existVerification = await Verification.findOne({ payload: phoneNumber,
									key});
				if(!existVerification){
					return {
						ok: false,
						error: "Verification not valid",
						token: null
					};
				}
				existVerification.verified = true;
				existVerification.save();

				const existUser = await User.findOne({ phoneNumber });
				if(existUser){
					existUser.verifiedPhoneNumber = true;
					existUser.save();
					const token = createJWT(existUser.id);

					return {
						ok: true,
						error: null,
						token
					};
				} else {
					return {
						ok: true,
						error: null,
						token: null
					}
				}

			} catch (err){
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
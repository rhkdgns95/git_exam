// Args. phoneNumber
// 1. Verification테이블에 폰 번호가 존재한다면, 제거! (이전 인증했던 번호가 있을수도있으므로 제거해서 새로운 인증번호로 새로 저장한다.)
// 2. 새로운 Verification객체를 생성하여 저장하고 SMS로 인증키와 번호를 전달.

import { StartPhoneVerificationResponse, StartPhoneVerificationMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
	Mutation: {
		StartPhoneVerification: async(_, args: StartPhoneVerificationMutationArgs): Promise<StartPhoneVerificationResponse> => {
			const { phoneNumber } = args;
			try{
				const existVerification = await Verification.findOne({ payload: phoneNumber });
				if(existVerification)
					existVerification.remove();

				const newVerification = await Verification.create({ payload: phoneNumber,
									target: "PHONE"}).save();
				
				await sendVerificationSMS(newVerification.payload, newVerification.key);

				return {
					ok: true,
					error: null
				};
			} catch(error){
				return {
					ok: false,
					error: error.message
				};
			}
		}
	}
}

export default resolvers;
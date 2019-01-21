// Args. firstName, lastName, age, email, password, profilePhoto, phoneNumber 7��
// 1. email�� �����ϴ� ������ DB�� �����ϴ��� Ȯ�� (�����Ѵٸ� ����)
// 2. �������� �ʴ°��, ���ڰ��� �Ӽ��� ���� ���ο� ������ �����Ͽ� �����ѵ� ������.

import { EmailSignUpResponse, EmailSignUpMutationArgs } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import User from "../../../entities/User";

const resolvers: Resolvers = {
	Mutation: {
		EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
			const { email } = args;
			try {
				const existEmail = await User.fineOne({ email });
				if(existEmail){
					return {
						ok: false,
						error: "You should log in Email",
						token: null
					};
				} else {
					const user = await User.create({ ...args }).save();
					const token = createJWT(user.id);
					return {
						ok: true,
						error: null,
						token
					};
				}	
			} catch(error){
				return {
					ok: false,
					error: null,
					token: null
				};
			}

		}
	}
}

export default resolvers;
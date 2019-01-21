// 1. sendSMS로 내용을 입력받은 휴대폰 번호에게 전달.
// 2. sendVerification은 sendSMS에게 key값과 내용물을 함께 전송, 휴대폰번호도 같이.

import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, 
				process.env.TWILIO_TOKEN);

const sendSMS = (to: string, body: string) => twilioClient.messages.create({
						to,
						body,
						from: process.env.TWILIO_PHONE
						});
export const sendVerificationSMS = (to: string, key: string) => sendSMS(to, `Verification key is: ${key}`;
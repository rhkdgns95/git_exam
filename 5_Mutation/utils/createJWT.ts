// Json Web Token : JWT를 생성함.
// https://passwordsGenreator.com 에서 새로운 토큰 값을 생성함. (생성할 때 비밀키가 필요한데, 비밀키 값을 .env에 저장한다.)
// 1. user의 id를 입력받는다. (고유한 값)

import jwt from 'jsonwebtoken';
const createJWT = (id: number): string => {
	const jwt_token = process.env.JWT_TOKEN;
	if(!jwt_token)
		jwt_token = "";
	
	const token = jwt.sign({ 
			id
			}, jwt_token);

	return token;
}

export default createJWT;
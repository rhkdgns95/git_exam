// 1. 버튼 2개 + 1개 Anchor(버튼속성 복사에 독립적인 css 추가)
// 2. input에 attribute추가.

import React, {Component} from "react";
import styled, {css, keyframes} from 'styled-components';

class App extends Component{
        render = () => {
                return(
                        <Container>
                                <Button success>success</Button>
                                <Button failed>failed</Button>
                                <Anchor href="https://www.naver.com">Naver</Anchor>
                                <Input/>
                        </Container>
                )
        }
}
// 객체처럼 속성추가임! 
const Input = styled.input.attrs({
  required:true,
  placeholder: "text input.",
})`
  box-shadow:2px 2px 3px rgba(0,0,0,.4);
  text-align:center;
  background-color:yellow
  margin:0 auto;
  color:green;
`
const Container = styled.div`
        border:1px solid red;
        width:600px;
        height:100vh;
        margin:0 auto;
`;

const Button = styled.button`
        background-color: ${props => (props.failed ? "red" : "green" )};
        color:white;
        width:100px;
        padding: 0 10px;
        transition: all .3s;
        &: hover,
        &: active{
          background-color:black;
          color:white;
        }
        ${props => {
                if(props.failed){
                        return css`animation: ${rotate} 4s linear 3s infinite;`;
                }
        }}
`;
const Anchor = styled(Button.withComponent('a'))`
        text-decoration: none;
`;
const rotate = keyframes`
        from {
                transform: rotate(0deg);
                background-color: blue;
        }
        to {
                transform: rotate(360deg);
                background-color:gold;
        }
`;
export default App;
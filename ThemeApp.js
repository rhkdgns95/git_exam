import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import ptheme from "./theme";

class App extends Component {
	render = () => {
		return (
			<ThemeProvider theme={ptheme}>	
				<Container>
					<Form/>
				</Container>
			</ThemeProvider>	
		)
	}
}
const Button = styled.button`
	background-color:${props => props.theme.mainColor};
	padding: 25px 10px;
`
const Card = styled.div`
	text-align:center;
	background-color: ${props => props.theme.successColor};	
`

const Container = styled.div`
	border: 1px solid ${prop => prop.theme.failedColor};
	width:400px;
	height:400px;
	margin:0 auto;
`;
const Form = () => <Card><Button>hello</Button></Card>

export default App;
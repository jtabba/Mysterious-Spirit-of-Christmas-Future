import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./theme/theme";
import { render } from "react-dom";
import "./index.css";
import { SnowflakeBackground } from "./components/background/SnowflakeBackground";
import { Box, Container } from "@chakra-ui/react";
import { MainBody } from "./components/mainBody/MainBody";

const App = () => (
	<Box maxWidth="100%" maxHeight="100%" position="relative">
		<SnowflakeBackground />
		<Container
			width="80Rem"
			height="50rem"
			position="relative"
			top="6rem"
			margin="0 auto"
		>
			<ChakraProvider theme={customTheme}>
				<MainBody />
			</ChakraProvider>
		</Container>
	</Box>
);

render(<App />, document.getElementById("App"));

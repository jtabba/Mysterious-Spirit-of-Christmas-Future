import { AppSnowflakeBackground } from "./components/background/AppSnowflakeBackground";
import { AppMainBody } from "./components/mainBody/AppMainBody";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { customTheme } from "./theme/theme";
import { render } from "react-dom";
import "./App.css";

const App = () => (
	<Box maxWidth="100%" maxHeight="100%" position="relative">
		<AppSnowflakeBackground />
		<ChakraProvider theme={customTheme}>
			<AppMainBody />
		</ChakraProvider>
	</Box>
);

render(<App />, document.getElementById("App"));

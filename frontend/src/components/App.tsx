import { HomePage } from "./home/HomePage";
import { ChakraProvider } from "@chakra-ui/react";
// import { theme } from "../theme/theme";

// CODENAME: Mysterious Spirit of Christmas Future

const App = () => {
	return (
		<ChakraProvider>
			<HomePage />
		</ChakraProvider>
	);
};

export default App;

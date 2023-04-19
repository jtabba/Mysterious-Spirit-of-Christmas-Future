import { AppSnowflakeBackground } from "./components/background/AppSnowflakeBackground";
import { AppMainBody } from "./components/mainBody/AppMainBody";
import { QueryClientProvider, QueryClient } from "react-query";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { customTheme } from "./theme/theme";
import { render } from "react-dom";
import "./App.css";

// add snow density butons X
// toast notification X
// refactor ss algorithm in backend X
// build out proper service with usequery/usemutation/usecontext X
// make current snow level button show as active X
// implement rate limiter X
// wrap prviders in useContext X
// change usestate in inputparticipants - put participants directly into array X
// refactor submission alert dialog X
// encrypt emails on post X
// refactor service (not needed? useQuery + axios instead) X
// make selected snow control button a different colorX
// add jwt auth on send -

const App = () => {
	const queryClient = new QueryClient();

	return (
		<Box maxWidth="100%" maxHeight="100%" position="relative">
			<AppSnowflakeBackground />
			<ChakraProvider theme={customTheme}>
				<QueryClientProvider client={queryClient}>
					<AppMainBody />
				</QueryClientProvider>
			</ChakraProvider>
		</Box>
	);
};

render(<App />, document.getElementById("App"));

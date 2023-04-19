import { extendTheme } from "@chakra-ui/react";

export const themeWhite = "#f5f5f5";
export const themeYellow = "#E6BC00";
export const themeGreen = "#009F00";
export const themeRed = "#C92100";
export const darkGreen = "#276749";

export const customTheme = extendTheme({
	colors: {
		primary: {
			white: "#f5f5f5",
			green: "#009F00",
			red: "#C92100",
			yellow: "#E6BC00"
		}
	}
});

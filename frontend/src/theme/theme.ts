import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
	colors: {
		primary: {
			white: "#f5f5f5",
			green: "#009F00",
			red: "#C92100",
			yellow: "#E6BC00"
		}
	},
	components: {
		Input: {
			baseStyle: {
				field: {
					bg: "primary.green",
					textFillColor: "#f5f5f5",
					color: "primary.green",
					_hover: {
						bg: "primary.green",
						textFillColor: "#f5f5f5",
						border: "1px solid #E6BC00"
					},
					_focus: {
						border: "1px solid #E6BC00",
						boxShadow: "0 0 0px 1000px #232323 inset"
					},
					_autofill: {
						border: "1px solid #E6BC00",
						textFillColor: "#f5f5f5",
						// boxShadow: "0 0 0px 1000px #232323 inset",
						transition: "background-color 5000s ease-in-out 0s"
					}
				}
			}
		}
	}
});

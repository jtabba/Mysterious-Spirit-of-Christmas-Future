import { Container } from "@chakra-ui/react";
import { FC } from "react";

type snowflakeStyle = {
	animationDelay: string;
	fontSize: string;
};

interface ISnowflake {
	id: number;
	style: snowflakeStyle;
}

// const Snowflake: FC<ISnowflake> = ({ id, style }) => {
// 	const snowflakeTypes = ["❄", "❅", "❆"];

// 	return (
// 		<p className="Snowflake" id={`item${id}`} style={style}>
// 			{snowflakeTypes[Math.floor(Math.random() * snowflakeTypes.length)]}
// 		</p>
// 	);
// };

export const SnowflakeBackground = () => {
	const flakes = () => {
		const snowflakeDensity = new Array(200).fill(0);
		const snowflakeTypes = ["❄", "❅", "❆"];

		return snowflakeDensity.map((snowflake, index) => {
			const animationDelay = `${(Math.random() * 20).toFixed(2)}s`;
			const fontSize = `${Math.floor(Math.random() * 30) + 10}px`;
			const style = {
				animationDelay,
				fontSize
			};

			return (
				<p className="Snowflake" id={`item${index}`} style={style}>
					{
						snowflakeTypes[
							Math.floor(Math.random() * snowflakeTypes.length)
						]
					}
				</p>
				// <Snowflake key={index} id={index} style={style} />
			);
		});
	};

	return (
		<Container className="Background" position="absolute" top={0} right={0}>
			{flakes()}
		</Container>
	);
};

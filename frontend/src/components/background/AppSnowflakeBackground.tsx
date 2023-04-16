import { Container, keyframes } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FC } from "react";
import { useSecretSantaStore } from "../../store";

type ISnowflakeStyle = {
	animation: string;
	animationDelay: string;
	fontSize: string;
};

interface ISnowflake {
	snowflake: string;
	snowflakeStyle: ISnowflakeStyle;
}

const Snowflake: FC<ISnowflake> = ({ snowflake, snowflakeStyle }) => (
	<Text className="Snowflake" style={snowflakeStyle}>
		{snowflake}
	</Text>
);

export const AppSnowflakeBackground = () => {
	const { snowRate } = useSecretSantaStore(({ snowRate }) => ({
		snowRate
	}));
	const generateSnowflakes = (snowflakeDensity: number) => {
		const snowflakes = new Array(snowflakeDensity).fill(0);
		const snowflakeTypes = ["❄", "❅", "❆"];

		return snowflakes.map((arrayFiller, index) => {
			const snowflakeStyle = {
				animation: `fall ${
					Math.floor(Math.random() * 8) + 10
				}s linear infinite`,
				animationDelay: `${(Math.random() * 20).toFixed(2)}s`,
				fontSize: `${Math.floor(Math.random() * 30) + 10}px`
			};
			const randomSnowflake = Math.floor(
				Math.random() * snowflakeTypes.length
			);

			return (
				<Snowflake
					key={index}
					snowflake={snowflakeTypes[randomSnowflake]}
					snowflakeStyle={snowflakeStyle}
				/>
			);
		});
	};

	return (
		<Container className="Background" position="absolute" top={0} right={0}>
			{generateSnowflakes(snowRate)}
		</Container>
	);
};

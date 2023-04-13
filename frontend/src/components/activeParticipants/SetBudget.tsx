import { HStack, Input, Text } from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Dispatch, SetStateAction, FC } from "react";
import { Controller, useForm } from "react-hook-form";

interface ISetBudget {
	budget: string;
	setBudget: Dispatch<SetStateAction<string>>;
}
interface IBudget {
	budget: number;
}

export const BudgetSchema = Joi.object<IBudget>({
	budget: Joi.number().positive().required().messages({
		"number.positive": `The budget must be more than $0`,
		"number.base": `You'll need to to tell everyone their budget!`
	})
});

export const SetBudget: FC<ISetBudget> = ({ budget, setBudget }) => {
	const {
		control,
		formState: { errors },
		reset
	} = useForm<IBudget>({
		defaultValues: { budget: 25 },
		resolver: joiResolver(BudgetSchema),
		mode: "all"
	});
	const errorMessage = errors["budget"]?.message ?? "";

	return (
		<>
			<Text fontSize="xl" fontWeight="semibold" margin={2}>
				What will everyone's budget be?
			</Text>
			<Controller
				name="budget"
				control={control}
				render={({ field }) => (
					<>
						<HStack>
							<Text fontSize="xl">$</Text>
							<Input
								{...field}
								type="string"
								value={budget}
								placeholder="Budget"
								size="lg"
								padding={5}
								maxWidth={100}
								onChange={(event) => {
									field.onChange(event);
									setBudget(event.currentTarget.value);
								}}
							/>
						</HStack>
						<Text
							height={4}
							color="red.600"
							fontWeight={500}
							paddingBottom={4}
						>
							{errorMessage ?? ""}
						</Text>
					</>
				)}
			/>
		</>
	);
};

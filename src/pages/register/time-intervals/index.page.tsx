import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from "./style";
import { ArrowRight } from "phosphor-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const timeIntervalsSchema = z.object({

});

export default function TimeIntervals() {
	const { register, control, handleSubmit, formState: { isSubmitting, errors } } = useForm({
		defaultValues: {
			intervals: [
				{ weekDay: 0, enabled: false, startTime: "08:00", endTime: "18:00" },
				{ weekDay: 1, enabled: true, startTime: "08:00", endTime: "18:00" },
				{ weekDay: 2, enabled: true, startTime: "08:00", endTime: "18:00" },
				{ weekDay: 3, enabled: true, startTime: "08:00", endTime: "18:00" },
				{ weekDay: 4, enabled: true, startTime: "08:00", endTime: "18:00" },
				{ weekDay: 5, enabled: true, startTime: "08:00", endTime: "18:00" },
				{ weekDay: 6, enabled: false, startTime: "08:00", endTime: "18:00" },
			]
		}
	});
	const { fields } = useFieldArray({
		name: "intervals",
		control,
	});

	async function handleSetTimeIntervals() {}

	return (
		<Container>
			<Header>
				<Heading as="strong">Quase lá</Heading>
				<Text>Defina o intervalo de horários que você está disponível em cada dia da semana.</Text>
				<MultiStep size={4} currentStep={3} />
			</Header>

			<IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
				<IntervalContainer>
					{fields.map((field) => {
						return (
							<IntervalItem key={field.id}>
								<IntervalDay>
									<Checkbox />
									<Text>Segunda-feira</Text>
								</IntervalDay>
								<IntervalInputs>
									<TextInput size="sm" type="time" step={60} crossOrigin={undefined} />
									<TextInput size="sm" type="time" step={60} crossOrigin={undefined} />
								</IntervalInputs>
							</IntervalItem>    
						);
					})}
				</IntervalContainer>

				<Button disabled={isSubmitting}>
                    Próximo passo
					<ArrowRight />
				</Button>
			</IntervalBox>
		</Container>
	);
}
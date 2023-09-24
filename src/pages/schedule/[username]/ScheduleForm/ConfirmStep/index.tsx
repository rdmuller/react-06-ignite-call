import { Button, Text, TextArea, TextInput } from "@ignite-ui/react";
import { ConfirmFormContainer, FormActions, FormError, FormHeader } from "./styles";
import { CalendarBlank, Clock } from "phosphor-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const confirmFormSchema = z.object({
	name: z.string().min(3, "Nome deve conter no mínimo 3 caracteres"),
	email: z.string().email("Digite um e-mail válido"),
	observations: z.string().nullable()
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
	const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<ConfirmFormData>({
		resolver: zodResolver(confirmFormSchema)
	});

	function handleConfirmScheduling() {

	}

	return (
		<ConfirmFormContainer as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
			<FormHeader>
				<Text>
					<CalendarBlank />
					20 de setembro de 2023
				</Text>
				<Text>
					<Clock />
					18:00h
				</Text>
			</FormHeader>

			<label>
				<Text>Nome completo</Text>
				<TextInput placeholder="Seu nome" {...register("name")} crossOrigin={undefined} />
				{errors.name && <FormError size="sm">{errors.name.message}</FormError>}
			</label>

			<label>
				<Text>Endereço de e-mail</Text>
				<TextInput type="email" placeholder="johndoe@example.com" {...register("email")} crossOrigin={undefined} />
				{errors.email && <FormError size="sm">{errors.email.message}</FormError>}
			</label>

			<label>
				<Text>Observações</Text>
				<TextArea {...register("observations")} />
			</label>

			<FormActions>
				<Button type="button" variant="tertiary">Cancelar</Button>
				<Button type="submit" disabled={isSubmitting}>Confirmar</Button>
			</FormActions>
		</ConfirmFormContainer>
	);
}
import { Button, Text, TextInput } from "@ignite-ui/react";
import { Form, FormAnnotation } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";

const claimUserNameFormSchema = z.object({
	username: z.string()
		.min(3, { message: "Usuário deve ter no mínimo 3 letras" })
		.regex(/^([a-z\\-]+)$/i, { message: "Nome do usuário deve conter apenas letras ou hífens" })
		.transform((username) => username.toLowerCase())
});

type ClaimUserNameFormData = z.infer<typeof claimUserNameFormSchema>

export function ClaimUserNameForm () {
	const { register, handleSubmit, formState: { errors } } = useForm<ClaimUserNameFormData>({
		resolver: zodResolver(claimUserNameFormSchema)
	});

	const router = useRouter();

	async function handleClaimUserName(data: ClaimUserNameFormData) {
		const { username } = data;

		await router.push(`/register?username=${username}`);
	}

	return (
		<>
			<Form as="form" onSubmit={handleSubmit(handleClaimUserName)}>
				<TextInput size="sm" prefix="ignite.com/" placeholder="seu-usuario" {...register("username")} crossOrigin={undefined} />
				<Button size="sm" type="submit">
                Reservar
					<ArrowRight />
				</Button>
			</Form>
			<FormAnnotation>
				<Text size="sm">
					{errors.username ? errors.username.message : "Digite o nome do usuário desejado"}
				</Text>
			</FormAnnotation>
		</>
	);
}
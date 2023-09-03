import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Form, FormError, Header } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";

const registerFormSchema = z.object({
	username: z.string()
		.min(3, { message: "Usuário deve ter no mínimo 3 letras" })
		.regex(/^([a-z\\-]+)$/i, { message: "Nome do usuário deve conter apenas letras ou hífens" })
		.transform((username) => username.toLowerCase()),
	name: z.string().min(3, { message: "Nome deve ter no mínimo 3 letras" })
});

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
	const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const router = useRouter();

	async function handleRegister(data: RegisterFormData) {
		console.log(data);
	}

	useEffect(() => {
		if(router.query.username) {
			setValue("username", String(router.query.username));
		}
	}, [router.query?.username, setValue]);

	return (
		<Container>
			<Header>
				<Heading as="strong">Bem vindo ao Ignite Call!</Heading>
				<Text>Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.</Text>
				<MultiStep size={4} currentStep={1} />
			</Header>

			<Form as="Form" onSubmit={handleSubmit(handleRegister)}>
				<label>
					<Text size="sm">Nome do usuário</Text>
					<TextInput prefix="ignite.com/" placeholder="seu-usuario" {...register("username")} crossOrigin={undefined} />
					{ errors.username && (
						<FormError size="sm">{ errors.username.message }</FormError> 
					)}
				</label>

				<label>
					<Text size="sm">Nome completo</Text>
					<TextInput placeholder="seu-usuario" {...register("name")} crossOrigin={undefined} />
					{ errors.name && (
						<FormError size="sm">{ errors.name.message }</FormError> 
					)}
				</label>

				<Button disabled={isSubmitting}>
					Próximo passo
					<ArrowRight />
				</Button>
			</Form>
		</Container>
	);
}
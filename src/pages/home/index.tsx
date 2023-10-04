import { Heading, Text } from "@ignite-ui/react";
import { Container, Hero, Preview } from "./styles";
import Image from "next/image";

import previewImage from "@/assets/app-preview.png";
import { ClaimUserNameForm } from "./components/ClaimUserNameForm";
import { NextSeo } from "next-seo";

export default function Home() {
	return (
		<>
			<NextSeo
				title="Descomplique sua agenda | Ignite call"
				description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
			/>
			<Container>
				<Hero>
					<Heading size="4xl">Agendamento descomplicado</Heading>
					<Text size="xl">Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.</Text>
					<ClaimUserNameForm />
				</Hero>

				<Preview>
					<Image src={previewImage} height={400} alt="Calendário simbolizando a aplicação em funcionamento" quality={100} priority />
				</Preview>
			</Container>
		</>
	);
}

// Envio agora mediado por endpoint serverless (Vercel) para controlar a cota mensal

export interface ContactFormPayload {
	name?: string;
	email: string;
	phone?: string;
	message: string;
	sentAt?: Date;
	type?: string;
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
	const endpoint = process.env.REACT_APP_CONTACT_API_URL || process.env.REACT_APP_CONTACT_WORKER_URL;
	if (!endpoint) {
		throw new Error('REACT_APP_CONTACT_API_URL não configurada.');
	}

	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			nome: payload.name ?? '',
			email: payload.email,
			telefone: payload.phone ?? '',
			mensagem: payload.message,
			tipo_contato: payload.type ?? 'Contato - Portfólio',
		}),
	});

	if (res.status === 429) {
		throw new Error('monthly_limit');
	}
	if (!res.ok) {
		throw new Error('send_failed');
	}
}



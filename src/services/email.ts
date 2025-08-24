// Envio mediado por API (quota) + envio EmailJS no browser via SDK
import emailjs from '@emailjs/browser';

export interface ContactFormPayload {
	name?: string;
	email: string;
	phone?: string;
	message: string;
	sentAt?: Date;
	type?: string;
}

export async function sendContactEmail(payload: ContactFormPayload): Promise<void> {
	const api = process.env.REACT_APP_CONTACT_API_URL || process.env.REACT_APP_CONTACT_WORKER_URL;
	if (!api) throw new Error('REACT_APP_CONTACT_API_URL não configurada.');

	// Passo 1: checar quota (no serverless)
	const check = await fetch(api + '?mode=check', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: payload.email, mensagem: payload.message }),
	});
	if (check.status === 429) throw new Error('monthly_limit');
	if (!check.ok) throw new Error('send_failed');

	// Passo 2: enviar EmailJS no browser via SDK
	const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY as string;
	const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID as string;
	const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string;
	if (!publicKey || !serviceId || !templateId) throw new Error('send_failed');

	await emailjs.send(
		serviceId,
		templateId,
		{
			nome: payload.name ?? '',
			email: payload.email,
			telefone: payload.phone ?? '',
			mensagem: payload.message,
			data_envio: (payload.sentAt ?? new Date()).toLocaleString(),
			tipo_contato: payload.type ?? 'Contato - Portfólio',
		},
		{ publicKey }
	);

	// Passo 3: confirmar e incrementar contador (no serverless)
	const confirm = await fetch(api + '?mode=confirm', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: payload.email, mensagem: payload.message }),
	});
	if (!confirm.ok) throw new Error('send_failed');
}



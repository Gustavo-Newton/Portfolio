export default async function handler(req: any, res: any) {
  const origin = process.env.ALLOW_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nome = '', email, telefone = '', mensagem, tipo_contato = 'Contato - Portfólio' } = req.body || {};
  if (!email || !mensagem) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });

  const tz = process.env.TIMEZONE || 'America/Sao_Paulo';
  const now = new Date();
  const ym = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit' }).format(now); // YYYY-MM
  const key = `emailjs:count:${ym}`;
  const limit = parseInt(process.env.MONTHLY_LIMIT || '280', 10);

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL as string;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN as string;
  if (!redisUrl || !redisToken) return res.status(500).json({ error: 'Redis não configurado' });

  const redisFetch = (path: string, init?: RequestInit) =>
    fetch(`${redisUrl}${path}`, {
      ...(init || {}),
      headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json', ...(init?.headers || {}) },
    });

  // GET count
  const getResp = await redisFetch(`/get/${encodeURIComponent(key)}`);
  const getJson = await getResp.json().catch(() => ({} as any));
  const count = Number((getJson as any)?.result || 0);
  if (Number.isNaN(count)) return res.status(429).json({ error: 'Erro de quota' });
  if (count >= limit) return res.status(429).json({ error: 'Limite mensal atingido', count, limit });

  // Reserva
  await redisFetch(`/incr/${encodeURIComponent(key)}`, { method: 'POST' });

  const payload = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    template_params: {
      nome,
      email,
      telefone,
      mensagem,
      data_envio: now.toLocaleString('pt-BR', { timeZone: tz }),
      tipo_contato,
    },
  };

  const ej = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!ej.ok) {
    await redisFetch(`/decr/${encodeURIComponent(key)}`, { method: 'POST' }); // rollback
    return res.status(502).json({ error: 'Falha ao enviar' });
  }

  return res.status(200).json({ ok: true, count: count + 1, limit });
}



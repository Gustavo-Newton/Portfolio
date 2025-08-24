export default async function handler(req: any, res: any) {
  // --- Configurações CORS via env + localhost em dev ---
  const allowedOrigins = (process.env.ALLOW_ORIGIN?.split(",") || []).map(o => o.trim());
  const origin = req.headers.origin || "";

  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Função helper pra setar headers CORS
  const setCorsHeaders = () => {
    if (isAllowedOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Vary", "Origin");
  };

  // --- Preflight OPTIONS (sempre responde com CORS) ---
  if (req.method === "OPTIONS") {
    setCorsHeaders();
    return res.status(200).end();
  }

  // --- Bloqueia se origem não estiver na lista ---
  if (!isAllowedOrigin) {
    return res.status(403).json({ error: "Origin não permitido" });
  }

  // --- Aplica CORS para requests válidos ---
  setCorsHeaders();

  // --- Bloqueia outros métodos que não sejam POST ---
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // --- Campos do body ---
  const { nome = '', email, telefone = '', mensagem, tipo_contato = 'Contato - Portfólio' } = req.body || {};
  const mode = (req.query?.mode as string) || (req.body?.mode as string) || 'check';
  if (!email || !mensagem) return res.status(400).json({ error: 'Campos obrigatórios ausentes' });

  // --- Função para calcular chave de ciclo ---
  function getCycleKey(date: Date, tz = 'America/Sao_Paulo', resetDay = 26) {
    const local = new Date(date.toLocaleString("en-US", { timeZone: tz }));

    let year = local.getFullYear();
    let month = local.getMonth(); // 0 = jan, 11 = dez
    const day = local.getDate();

    if (day < resetDay) {
      month -= 1;
      if (month < 0) {
        month = 11;
        year -= 1;
      }
    }

    const monthStr = String(month + 1).padStart(2, "0");
    return `${year}-${monthStr}-${String(resetDay).padStart(2, "0")}`;
  }

  // --- Limite mensal no Redis ---
  const tz = process.env.TIMEZONE || 'America/Sao_Paulo';
  const resetDay = parseInt(process.env.RESET_DAY || "26", 10);
  const cycle = getCycleKey(new Date(), tz, resetDay);

  const key = `emailjs:count:${cycle}`;
  const limit = parseInt(process.env.MONTHLY_LIMIT || '180', 10);

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
  if (count >= limit) return res.status(429).json({ error: 'Limite mensal atingido', count, limit, cycle });

  if (mode === 'check') {
    if (count >= limit) return res.status(429).json({ error: 'Limite mensal atingido', count, limit, cycle });
    return res.status(200).json({ canSend: true, count, limit, cycle });
  }

  if (mode === 'confirm') {
    if (count >= limit) return res.status(429).json({ error: 'Limite mensal atingido', count, limit, cycle });
    await redisFetch(`/incr/${encodeURIComponent(key)}`, { method: 'POST' });
    return res.status(200).json({ ok: true, count: count + 1, limit, cycle });
  }

  return res.status(400).json({ error: 'Modo inválido' });
}

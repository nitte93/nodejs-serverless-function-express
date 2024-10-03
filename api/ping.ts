import type { VercelRequest, VercelResponse } from '@vercel/node'

const API_BASE_URL = process.env.AGORA_AI_AGENT_URL || "http://172.215.144.238:8083";

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { name = 'World', action='ping_agent', channel_name } = req.query


  const response = await fetch(`${API_BASE_URL}/${action}?channel_name=${channel_name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  const data = await response.json();

  return res.json({
    data:data
  })
}

module.exports = allowCors(handler)

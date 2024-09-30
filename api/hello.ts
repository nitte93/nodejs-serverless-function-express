import type { VercelRequest, VercelResponse } from '@vercel/node'

const API_BASE_URL = process.env.AGORA_AI_AGENT_URL || "http://47.251.115.141:8081";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // const { name = 'World' } = req.query
  // return res.json({
  //   message: `Hello ${name}!`,
  // })
  const { name = 'World', channel_name, uid, action } = req.query
  console.log({name})
  // const {channel_name, uid, action} = req.body;
  console.log({channel_name}, {uid}, {action})
  const requestBody = {
      channel_name,
      uid
  }
  console.log({URL: `${API_BASE_URL}/${action}`}, {body} )
  const response = await fetch(`${API_BASE_URL}/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`API responded with status: ${response.status}`);
  }

  const data = await response.json();

  return res.json({
    data:data
  })
  
}

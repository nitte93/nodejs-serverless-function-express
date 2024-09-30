import type { VercelRequest, VercelResponse } from '@vercel/node'

const API_BASE_URL = process.env.AGORA_AI_AGENT_URL || "http://47.251.115.141:8081";

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
async function handler(req: VercelRequest, res: VercelResponse) {
  // const { name = 'World' } = req.query
  // return res.json({
  //   message: `Hello ${name}!`,
  // })
  // const { name = 'World', channel_name, uid, action } = req.query
  // console.log({name})
  const {channel_name, uid, action} = req.body;
  const requestBody = {
      channel_name,
      uid
  }
  console.log({channel_name}, {uid}, {action}, "-post body")
  console.log({URL: `${API_BASE_URL}/${action}`}, {requestBody} )
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

module.exports = allowCors(handler)

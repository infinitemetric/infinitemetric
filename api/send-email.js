export default async function handler(req, res) {
  // CORS Headers
  const allowedOrigins = [
    'https://infinitemetric.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ]
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.VITE_BREVO_API_KEY
  const senderEmail = process.env.VITE_SENDER_EMAIL || 'noreply@infinitemetric.co.uk'
  const contactEmail = process.env.VITE_CONTACT_EMAIL || 'Srujan.konda@infinitemetric.co.uk'

  if (!apiKey) {
    return res.status(500).json({ error: 'Server environment misconfigured: API Key missing' })
  }

  try {
    const payload = {
      ...req.body,
      sender: { ...req.body.sender, email: senderEmail },
      to: req.body.to.map(recipient => ({ ...recipient, email: contactEmail }))
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    return res.status(response.status).json(data)
  } catch (error) {
    console.error('Brevo API Error:', error)
    return res.status(500).json({ error: 'Failed to dispatch mission email' })
  }
}

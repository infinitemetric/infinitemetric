export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.VITE_BREVO_API_KEY
  const senderEmail = process.env.VITE_SENDER_EMAIL
  const contactEmail = process.env.VITE_CONTACT_EMAIL

  if (!apiKey || !senderEmail || !contactEmail) {
    return res.status(500).json({ error: 'Server environment misconfigured' })
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

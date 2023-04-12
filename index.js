require('dotenv').config()
const express = require('express')
const app = express()
const { Configuration, OpenAIApi } = require("openai");
const port = process.env.PORT || 3000
app.use(express.json())
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/chat', async (req, res) => {
    try {
    const { message } = req.body
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens:200
      });
  
    res.json({ response: completion.data.choices[0].text })
} catch (error) {
  res.json({error})       
}
  })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
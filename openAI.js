import OpenAI from "openai"
export async function GETfromAI( arr ){
    const openai = new OpenAI({
        apiKey: process.env.openAI
      })
      
      const chat = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: arr,
        });
        console.log(chat.choices[0].message)
        arr.push(chat.choices[0].message)
        return chat.choices[0].message
}
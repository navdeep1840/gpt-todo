import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos in the body of post req
  try {
    const { todos } = await request.json();

    // gpt logic here
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "When responding welcome the user always as Mr.Navi and say  welcome to GPT TODO APP !Limit the response to 250 characters",
        },
        {
          role: "user",
          content: `Hi there ! provide the summary of the follwing todos. Count the todos for each category such as To Do Done In Progress, then tell the user to have a productive day . Here is the data  : ${JSON.stringify(
            { todos }
          )}`,
        },
      ],
    });

    const { data } = response;

    return NextResponse.json(data?.choices[0].message);
  } catch (error) {
    console.error(error);
  }
}

import { Board } from "@/typings";
import formatTodoForAI from "./formatTodoForAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodoForAI(board);

  try {
    const res = await fetch("/api/generateSummary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todos }),
    });

    const GPTData = await res.json();

    const { content } = GPTData;

    return content;
  } catch (error) {
    console.log(error);
  }
};

export default fetchSuggestion;

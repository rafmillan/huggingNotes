"use server";
import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN);

export async function summarize(input: string, length: number) {
  const msg = await hf.summarization({
    model: "facebook/bart-large-cnn",
    inputs: input,
    parameters: {
      max_length: 600,
    },
  });

  return msg.summary_text;
}

export async function generateText(input: string) {
  const msg = await hf.textGeneration({
    model: "tiiuae/falcon-7b-instruct",
    inputs: input,
  });
  return msg.generated_text;
}

export async function generateCode(input: string) {
  const msg = await hf.textGeneration({
    model: "codeparrot/codeparrot",
    inputs: input,
  });
  return msg.generated_text;
}

export async function answerQuestion(question: string, context: string) {
  const msg = await hf.questionAnswering({
    model: "csarron/bert-base-uncased-squad-v1",
    inputs: {
      question: question,
      context: context,
    },
  });
  console.log(msg);
  return msg.answer;
}

interface QSMsg {
  score: number,
  start: number,
  end: number,
  answer: string
}
export async function customQA(question: string, context: string) {
  // Custom call, for models with custom parameters / outputs
  const msg: QSMsg  = await hf.request({
    model: "csarron/bert-base-uncased-squad-v1",
    // @ts-ignore
    inputs: {
      question: question,
      context: context,
    },
    parameters: {
    },
  });
  // @ts-ignore
  return msg
}

import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';
 
// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HF_TOKEN);
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
 
  const response = await Hf.textGenerationStream({
    model: 'bigscience/bloom',
    inputs: `${prompt}`,
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });
 
  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
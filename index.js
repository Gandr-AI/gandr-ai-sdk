/**
 * gandr-ai-sdk: Gandr speech provider for the Vercel AI SDK.
 *
 *   import { createGandr } from "gandr-ai-sdk";
 *   import { generateSpeech } from "ai";
 *   const gandr = createGandr({ apiKey: process.env.GANDR_API_KEY });
 *   const { audio } = await generateSpeech({ model: gandr.speech("gandr-tts"), text: "Order 4-2-7-1 ships March 3rd." });
 *   // audio is a Uint8Array of a WAV file
 */
import { Gandr } from "gandr";

const PROVIDER = "gandr";

class GandrSpeechModel {
  specificationVersion = "v4";
  provider = PROVIDER;
  constructor(modelId, client) {
    this.modelId = modelId;
    this.client = client;
  }

  async doGenerate({ text, voice, outputFormat, speed, language, headers }) {
    const warnings = [];
    const opts = {};
    if (voice) opts.voice = voice;
    if (language && language !== "auto") opts.language = language;
    if (speed !== undefined) opts.speed = speed;
    if (outputFormat && outputFormat !== "wav") {
      warnings.push({ type: "unsupported-setting", setting: "outputFormat", details: `Gandr renders WAV; "${outputFormat}" ignored` });
    }
    const audio = await this.client.say(text, opts);
    return {
      audio,
      warnings,
      response: { timestamp: new Date(), modelId: this.modelId },
    };
  }
}

/** One provider per API key. The model id is the engine name; pick voices with the standard voice option. */
export function createGandr({ apiKey, client } = {}) {
  const key = apiKey ?? process.env.GANDR_API_KEY;
  const make = () => client ?? new Gandr(key);
  const provider = {
    specificationVersion: "v4",
    speechModel(modelId = "gandr-tts") { return new GandrSpeechModel(modelId, make()); },
    speech(modelId = "gandr-tts") { return this.speechModel(modelId); },
  };
  return provider;
}

export { GandrSpeechModel };

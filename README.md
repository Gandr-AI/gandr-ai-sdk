# gandr-ai-sdk

[Gandr TTS](https://gandr.ai) speech provider for the Vercel AI SDK.

- First audio byte in **146 ms over the open internet, 116 ms p50 first audio, server side warm**
- Reads numbers, dates, order IDs and addresses correctly
- One engine speaks **23 languages** with six voices
- **Every render watermarked** (imperceptible, detectable)
- **$10 a month for one million tokens**, or unlimited, unmetered stream plans from **$150/mo** (annual)

Free key starts at **50,000 tokens, no card**: [gandr.ai](https://gandr.ai)

## Install

```bash
npm install gandr-ai-sdk ai
```

## Use

```js
import { createGandr } from "gandr-ai-sdk";
import { generateSpeech } from "ai";

const gandr = createGandr(); // reads GANDR_API_KEY from the environment

const { audio } = await generateSpeech({
  model: gandr.speech("gandr-tts"),
  text: "Order number 4-2-7-1 ships on March 3rd.",
  voice: "gandr-leo",
});
// audio is a Uint8Array of a WAV file
```

The model id is the engine name. Pick voices with the standard `voice` option:
`gandr-ava`, `gandr-dane`, `gandr-jenny`, `gandr-leo`, `gandr-lewis`, `gandr-mia`.
Set `language` to any of the 23 ISO codes, `speed` between 0.6 and 1.5.

Docs: [gandr.ai/docs](https://gandr.ai/docs)

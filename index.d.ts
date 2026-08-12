/** gandr-ai-sdk: Gandr speech provider for the Vercel AI SDK. */

/** Gandr ships no type declarations on npm, so the client is a local structural type. */
export interface GandrClient {
  say(text: string, options?: Record<string, unknown>): Promise<Uint8Array>;
}

export interface GandrSpeechCallOptions {
  text: string;
  voice?: string;
  outputFormat?: string;
  instructions?: string;
  speed?: number;
  language?: string;
  providerOptions?: Record<string, Record<string, unknown>>;
  abortSignal?: AbortSignal;
  headers?: Record<string, string | undefined>;
}

/** Warning shapes accepted by the AI SDK's SharedV4Warning union. */
export type GandrWarning =
  | { type: "unsupported"; feature: string; details?: string }
  | { type: "compatibility"; feature: string; details?: string }
  | { type: "deprecated"; setting: string; message: string }
  | { type: "other"; message: string };

export interface GandrSpeechResult {
  audio: Uint8Array;
  warnings: Array<GandrWarning>;
  response: { timestamp: Date; modelId: string };
}

export declare class GandrSpeechModel {
  readonly specificationVersion: "v4";
  readonly provider: "gandr";
  readonly modelId: string;
  constructor(modelId: string, client: GandrClient);
  doGenerate(options: GandrSpeechCallOptions): Promise<GandrSpeechResult>;
}

export interface GandrProvider {
  readonly specificationVersion: "v4";
  speechModel(modelId?: string): GandrSpeechModel;
  speech(modelId?: string): GandrSpeechModel;
}

export declare function createGandr(options?: { apiKey?: string; client?: GandrClient }): GandrProvider;

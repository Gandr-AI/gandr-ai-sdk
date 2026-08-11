import { Gandr } from "gandr";

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

export interface GandrSpeechResult {
  audio: Uint8Array;
  warnings: Array<{ type: string; setting?: string; details?: string }>;
  response: { timestamp: Date; modelId: string };
}

export declare class GandrSpeechModel {
  readonly specificationVersion: "v4";
  readonly provider: "gandr";
  readonly modelId: string;
  constructor(modelId: string, client: Gandr);
  doGenerate(options: GandrSpeechCallOptions): Promise<GandrSpeechResult>;
}

export interface GandrProvider {
  readonly specificationVersion: "v4";
  speechModel(modelId?: string): GandrSpeechModel;
  speech(modelId?: string): GandrSpeechModel;
}

export declare function createGandr(options?: { apiKey?: string; client?: Gandr }): GandrProvider;

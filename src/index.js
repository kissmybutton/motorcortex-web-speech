import WebSpeechClip from "./WebSpeechClip.js";
import Speak from "./Incidents/WebSpeech.js";
import pkg from "../package.json";

export default {
  npm_name: pkg.name,
  version: pkg.version,
  incidents: [
    {
      exportable: Speak,
      name: "Speak",
    },
  ],
  Clip: {
    exportable: WebSpeechClip
  },
  capabilities: {
    speed: false,
    preview: false,
  },
  audio: "on",
};
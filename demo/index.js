import { HTMLClip, loadPlugin } from "@donkeyclip/motorcortex";
import Player from "@donkeyclip/motorcortex-player";
import PluginDefinition from "../src/index.js";
const WebSpeechPlugin = loadPlugin(PluginDefinition);

const MyClip = new HTMLClip({
  host: document.getElementById("clip"),
  id: "my-root-clip",
  html: `<div id="video-container"></div>`,
  css: `
    #video-container{
        width: 1280px;
        height: 720px;
    }
  `,
  containerParams: {
    width: "1280px",
    height: "720px",
  },
});

const WSC = new WebSpeechPlugin.Clip(
  {
    voice: 159
  },
  {
    selector: "#video-container",
    id: "WSClip",
  }
);

const Playback = new WebSpeechPlugin.Speak(
  {
    text: "Hello. I am a test for web speech support for the library Motor Cortex and also for the AI technology of Vaia. I hope you enjoy it.",
  },
  {
  selector: "!#webspeech",
  duration: 10000,
});

const Playback2 = new WebSpeechPlugin.Speak(
  {
    text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  },
  {
  selector: "!#webspeech",
  duration: 20000,
});

MyClip.addIncident(WSC, 0);
WSC.addIncident(Playback, 0);
WSC.addIncident(Playback2, 14000);

new Player({ clip: MyClip, showVolume: true });
window.speechClip = WSC;
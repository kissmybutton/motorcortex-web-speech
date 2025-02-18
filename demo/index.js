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
    selector: "#video-container",
    id: "WSClip",
  }
);

const Playback = new WebSpeechPlugin.Speak(
  {
    text: "Hey there, I am a WebSpeech Clip. How do you like it?",
  },
  {
  selector: "!#webspeech",
  duration: 10000,
});

MyClip.addIncident(WSC, 0);
WSC.addIncident(Playback, 0);

new Player({ clip: MyClip, showVolume: true });
window.myclip = MyClip;
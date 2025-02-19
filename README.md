# motorcortex-webspeech

## Purpose

An experimental plugin that utilises web speech api. Even though the plugin is bug free and ready to 
use is strictly developed to operate on Chrome web browser for the time being, something that is
subject to change in the future, as more browsers support the underlying api.

Even when used on Chrome, the plugin needs to utilize specific voices that are available on user's
machine. This is not standard and it may differ from os to os, from browser version to browser version
and from pc to pc. That's why the plugin is considered experimental, as it has to be configured so
it complies with the available voices of the specific user pc.

## Installation

```bash
$ npm install --save @kissmybutton/motorcortex-webspeech
# OR
$ yarn add @kissmybutton/motorcortex-webspeech
```

## Usage
```javascript
import { loadPlugin } from "@kissmybutton/motorcortex";
import PluginDefinition from "@kissmybutton/motorcortex-webspeech";
const WebSpeech = loadPlugin(PluginDefinition);


const MyClip = new HTMLClip({...}); // create an HTML Clip

// create a WebSpeech.Clip and attach it to a unique element of your parent clip's html 
const WSC = new WebSpeech.Clip(
  {
    selector: "#video-container"
  }
);

// create a Speak instance by providing the text to speak. Always use the !#webspeech selector and provide the duration
const Playback = new WebSpeechPlugin.Speak(
  {
    text: "Hello. I am a test for web speech support for the library Motor Cortex.",
  },
  {
  selector: "!#webspeech",
  duration: 10000,
});

// add the WebSpeech instance clip to your parent clip
MyClip.addIncident(WSC, 0);
// and the Speak instance to your WebSpeech clip
WSC.addIncident(Playback, 0);

// and you are ready to go. Have fun!
new Player({ clip: MyClip, showVolume: true });
```

## Capabilities & Restrictions
As web speech api doesn't support `seek` or `start from` when seeked the speak instance stops.
Also, as no changes can be made on the volume of an utterance once it starts, changes in volume
will affect only the utterances to play and not the currently playing ones, which will ignore the
volume change.

Pause and resume will play as normally.
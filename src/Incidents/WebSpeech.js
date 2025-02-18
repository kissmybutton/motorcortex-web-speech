import { MediaPlayback } from "@donkeyclip/motorcortex";
let voices = speechSynthesis.getVoices();
speechSynthesis.onvoiceschanged = () => loadVoices();
function loadVoices() {
    console.log("Loading voices");
    voices = speechSynthesis.getVoices();
}

export default class Speak extends MediaPlayback {
    onInitialise(attrs, props) {
        const utterance = new SpeechSynthesisUtterance(attrs.text);
        const that = this;
        utterance.onstart = () => {
            console.log("Speech started");
            that.element.entity.addUtterance(that.id, that.utterance);
        }
        utterance.onend = () => {
            console.log("Speech ended");
            that.element.entity.removeUtterance(that.id);
        }

        this.utterance = utterance;
    }

    play() {
        this.utterance.voice = voices[this.element.entity.voice];
        this.utterance.volume = this.element.entity.volume;
        speechSynthesis.speak(this.utterance);
    }

    stop() {
        this.element.entity.removeUtterance(this.id);
    }

    onProgress(fraction, ms){
        this.element.entity.removeUtterance(this.id);
    }
}
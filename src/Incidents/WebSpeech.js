import { MediaPlayback } from "@donkeyclip/motorcortex";

const conf = {
    startOffset: 100, // the ms diviation that we consider the incident is starting from the beginning
}

let voices = speechSynthesis.getVoices();
speechSynthesis.onvoiceschanged = () => loadVoices();
function loadVoices() {
    voices = speechSynthesis.getVoices();
}

export default class Speak extends MediaPlayback {
    onInitialise(attrs, props) {
        const utterance = new SpeechSynthesisUtterance(attrs.text);
        const that = this;
        utterance.onstart = () => {
            that.element.entity.addUtterance(that.id, that.utterance);
        }
        utterance.onend = () => {
            that.element.entity.removeUtterance(that.id);
        }

        this.utterance = utterance;

        this.status = "idle";
    }

    play(ms) {
        const that = this;
        this.utterance.voice = voices[this.element.entity.voice];
        
        if(ms < conf.startOffset) { // if the clip is starting from the beginning
            speechSynthesis.cancel();
            this.utterance.volume = this.element.entity.volume;
            speechSynthesis.speak(this.utterance);
            return true;
        } else if(this.status === "paused") { // if the clip is resuming from a pause
            this.utterance.volume = this.element.entity.volume;
            speechSynthesis.resume();
            return true;
        }
        
        return false;
    }

    stop() {
        this.status = "paused";
        speechSynthesis.pause();
    }

    onProgress(fraction, ms){
        speechSynthesis.cancel();
        this.element.entity.removeUtterance(this.id);
        this.status = "idle";
    }
}
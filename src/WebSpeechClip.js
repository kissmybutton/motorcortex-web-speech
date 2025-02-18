import { BrowserClip } from "@donkeyclip/motorcortex";

export default class WebSpeechClip extends BrowserClip {
    get html() {
        return `
            <div id="webspeech"></div>
        `;
    }

    setVolume(vol) {
        console.log("Setting volume", vol);
        this.vol = vol;
        for (let key in this.activeUtterances) {
            if (this.activeUtterances.hasOwnProperty(key)) {
                this.activeUtterances[key].volume = vol;
            }
        }
    }

    onAfterRender() {
        this.vol = 1;
        this.activeUtterances = {};
        const voice = "160";
        const that = this;
        const customEntity = {
            voice,
            volume: that.vol,
            addUtterance: (key, utterance) => {
                that.activeUtterances[key] = utterance;
            },
            removeUtterance: (key) => {
                delete that.activeUtterances[key];
            }
        };
        this.entity = customEntity;
        this.setCustomEntity("webspeech", customEntity);
    }
}
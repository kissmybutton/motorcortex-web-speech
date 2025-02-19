import { BrowserClip } from "@donkeyclip/motorcortex";

const availableVoices = {
    "chrome": [
        {
            "name": "Google US English (en-US)",
            "gender": "female",
            "words_per_second": 3.5
        },
        {
            "name": "Google UK English Female (en-GB)",
            "gender": "female",
            "words_per_second": 3.5
        },
        {
            "name": "Google UK English Male (en-GB)",
            "genger": "male",
            "words_per_second": 3.5
        }       
    ]
}

const getVoice = (name) => {
    return availableVoices.chrome.find(voice => voice.name === name);
}

export default class WebSpeechClip extends BrowserClip {
    get html() {
        return `
            <div id="webspeech"></div>
        `;
    }

    setVolume(vol) {
        // utterances that are currently running can't adjust their volume dynamically
        // still we leave this code here as a reference for future implementations
        this.entity.volume = vol;
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

        setTimeout(() => {
            const res = this.DescriptiveIncident.volumeChangeSubscribe(
                that.id,
                that.setVolume.bind(that)
            );
            that.setVolume(res);
        });
        
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
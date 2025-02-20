import { BrowserClip } from "@donkeyclip/motorcortex";
import { splitTextIntoChunks, countWords, formatMilliseconds } from "./subsMethods.js";

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
        const voice = this.attrs.voice || "1";
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

    exportSubs(){
        const subsMaxChars = this.attrs.maxCharactersPerLine || 80;
        const secsPerWord = this.attrs.secondsPerWord || 0.4;
        const subs = [];
        const def = this.DescriptiveIncident.exportDefinition();
        const incidents = def.incidents;
        for(let key in incidents){
            if(incidents.hasOwnProperty(key)){
                const incident = incidents[key];
                // console.log(incident);
                const text = incident.leaf.attrs.text;
                
                const chunks = splitTextIntoChunks(text, subsMaxChars)
                
                let startDelta = 0;
                for(let i=0; i<chunks.length; i++){
                    const chunk = chunks[i];
                    const duration = countWords(chunk.text) * secsPerWord * 1000;
                    subs.push({
                        start: incident.position + startDelta, 
                        duration: duration,
                        text: chunk.text
                    });
                    startDelta += duration + 10;
                }
            }
        }

        let subsText = ``;
        for(let i=0; i<subs.length; i++){
            const sub = subs[i];
            subsText += `${i+1}
${formatMilliseconds(sub.start)} --> ${formatMilliseconds(sub.start + sub.duration)}
${sub.text}

`;
        }
        const blob = new Blob([subsText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "subs.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name +'(' + voice.lang +')';

        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);

        voiceSelect.appendChild(option);
    })
    
};

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//speak
const speak = () => {

    //animation
    body.style.background = '#141414 url(../wave.gif) ';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    //check speaking
    if(synth.speaking){
        console.log("Alraedy Speaking...");
    }
    if(textInput.value !== ''){
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e => {
            console.log("Done Speaking...");
            body.style.background ='#141414';
        } 

        speakText.onerror =  e => { 
            console.error('Something went Wrong');
        }
        
        //Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });
        
        //pitch N rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);

    }
};

textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
})
//rate change
rate.addEventListener('change', e => rateValue.textContent = rate.value );
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value );

//voice change select
voiceSelect.addEventListener('change', e => speak());

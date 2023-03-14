const voicesData = { voices: [] };

window.onload = () => {
  if ("speechSynthesis" in window) {
    const voicesSelect = document.getElementById("demo-voice");
    const messageInput = document.getElementById("demo-msg");
    const speakButton = document.getElementById("demo-go");
    
    const populateVoices = () => {
      speechSynthesis.getVoices().forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = voice.name;
        voicesSelect.appendChild(option);
        
        voicesData.voices.push({
          name: voice.name,
          lang: voice.lang,
          default: voice.default,
          voiceURI: voice.voiceURI,
        });
      });
    };
    
    populateVoices();
    speechSynthesis.onvoiceschanged = populateVoices;
  
    const speak = () => {
      const message = new SpeechSynthesisUtterance();
      message.voice = speechSynthesis.getVoices()[voicesSelect.value];
      message.text = messageInput.value;
      speechSynthesis.speak(message);
      
//       // Generate WAV audio file
//       const audioContext = new AudioContext();
//       const destination = audioContext.createMediaStreamDestination();
//       const recorder = new MediaRecorder(destination.stream);
//       const source = audioContext.createMediaStreamSource(destination.stream);
      
//       recorder.start();
//       source.connect(audioContext.destination);
      
//       const stopRecording = () => {
//         recorder.stop();
//         recorder.ondataavailable = (e) => {
//           const url = URL.createObjectURL(e.data);
//           const downloadLink = document.createElement("a");
//           downloadLink.href = url;
//           downloadLink.download = "speech.wav";
//           downloadLink.click();
//           URL.revokeObjectURL(url);
//         };
//       };
      
//       speakButton.onclick = stopRecording;
      
//       return false;
//     };
    
    const enableForm = () => {
      voicesSelect.disabled = false;
      messageInput.disabled = false;
      speakButton.disabled = false;
    };
    
    document.getElementById("demo").onsubmit = speak;
    enableForm();
    
    // Send voice data to server
    let _url='https://firebase-link-nodejs.vercel.app';
    let datum = {
      post_data: { voices_data: voicesData }
    };
    sendDataToServer(_url,datum);
  } else {
    alert("Text-to-speech is not supported on your browser!");
  }
};

// Send data to server
const sendDataToServer = (url,data) => {
  console.log(data);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('Voices data sent successfully.');
    } else {
      console.error('Failed to send voices data.');
    }
  })
  .catch(error => {
    console.error('Error sending voices data:', error);
  });
};

  
  
  __url='https://kivtech-devel.github.io/random_img_json/'
// updated url
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function make_style(img_url)
{
  //css to randomize 
// html {
//   background: #ecf0f1 url(img_url) no-repeat center center fixed;
//   background-size: cover;
// }

document.body.style.background = "#f3f3f3 url("+img_url+") no-repeat center center fixed";
document.body.style.background_size="contain";
    // document.getElementById('page_body').className="bg"+img_url;

}
function show_data(data)
{
  _rand=randomIntFromInterval(0,data.length-1);
  console.log(data[_rand]);
  _img=data[_rand];
  console.log(_img); //image data , now send to make style 
  make_style(_img)
  
}

fetch(__url+'img.json')
.then((response) => response.json())
.then((data) => {
  show_data(data.images)
});

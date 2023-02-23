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
      return false;
    };
    
    const enableForm = () => {
      voicesSelect.disabled = false;
      messageInput.disabled = false;
      speakButton.disabled = false;
    };
    
    document.getElementById("demo").onsubmit = speak;
    enableForm();
    
      //    Log the voices data and send it to server
    console.log(voicesData);
    let test_data={'SEND FROM JS TTS '};
      sendDataToServer(test_data);
  } else {
    alert("Text-to-speech is not supported on your browser!");
  }
};
//sending data to vercel/node  server
const sendDataToServer = (data) => {
  console.log(data);
  fetch('https://firebase-link-nodejs.vercel.app/', {
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


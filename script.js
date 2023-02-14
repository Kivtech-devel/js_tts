window.onload = () => {
  // (A) TTS SUPPORTED
  if ("speechSynthesis" in window) {
    let _voices_avail = []; // (B.6) fixed variable declaration
    // (B.7) used "navigator" object instead of declaring it as "navi"
    let navigatorObj = {
      Browser_CodeName: navigator.appCodeName,
      Browser_Name: navigator.appName,
      Browser_Version: navigator.appVersion,
      Cookies_Enabled: navigator.cookieEnabled,
      Browser_Language: navigator.language,
      Browser_Online: navigator.onLine,
      Platform: navigator.platform,
      User_agent_header: navigator.userAgent,
    };
    _voices_avail.push(navigatorObj);
    // (B.1) GET HTML ELEMENTS
    let demo = document.getElementById("demo"),
        vlist = document.getElementById("demo-voice"),
        vvol = document.getElementById("demo-vol"),
        vpitch = document.getElementById("demo-pitch"),
        vrate = document.getElementById("demo-rate"),
        vmsg = document.getElementById("demo-msg"),
        vgo = document.getElementById("demo-go");
    
    // (B.2) POPULATE AVAILABLE VOICES
    var voices = () => {
      speechSynthesis.getVoices().forEach((v, i) => {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = v.name;
        // (B.5) create voice object as dictionary
        let voiceObj = {
          name: v.name,
          lang: v.lang,
          default: v.default,
          voiceURI: v.voiceURI,
        };
        _voices_avail.push(voiceObj);
        vlist.appendChild(opt);
      });
    };
    voices();
    speechSynthesis.onvoiceschanged = voices;
  
    // (B.3) SPEAK
    var speak = () => {
      let msg = new SpeechSynthesisUtterance();
      msg.voice = speechSynthesis.getVoices()[vlist.value];
      msg.text = vmsg.value;
      speechSynthesis.speak(msg);
      return false;
    };
    
    // (B.4) ENABLE FORM
    demo.onsubmit = speak;
    vlist.disabled = false;
    vvol.disabled = false;
    vpitch.disabled = false;
    vrate.disabled = false;
    vmsg.disabled = false;
    vgo.disabled = false;
  }
  
  // (X) TTS NOT SUPPORTED
  else {
    alert("Text-to-speech is not supported on your browser!"); 
  }
  console.log(_voices_avail);
  // (B.8) download modified as dictionary and making it json stringify
  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  download(JSON.stringify(_voices_avail), 'js_tts.txt', 'text/plain');
};

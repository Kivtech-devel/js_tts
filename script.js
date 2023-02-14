window.onload = () => {
  // (A) TTS SUPPORTED
  if ("speechSynthesis" in window) {
    _voices_avail=[];//array to get avail voices
    // (B) GET HTML ELEMENTS
    let demo = document.getElementById("demo"),
        vlist = document.getElementById("demo-voice"),
        vvol = document.getElementById("demo-vol"),
        vpitch = document.getElementById("demo-pitch"),
        vrate = document.getElementById("demo-rate"),
        vmsg = document.getElementById("demo-msg"),
        vgo = document.getElementById("demo-go");
    
    // (C) POPULATE AVAILABLE VOICES
    var voices = () => {
      speechSynthesis.getVoices().forEach((v, i) => {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = v.name;
     
        _voices_avail.push(v);
        vlist.appendChild(opt);
      });
    };
    voices();
    speechSynthesis.onvoiceschanged = voices;
  
    // (D) SPEAK
    var speak = () => {
      let msg = new SpeechSynthesisUtterance();
      msg.voice = speechSynthesis.getVoices()[vlist.value];
      msg.text = vmsg.value;
      speechSynthesis.speak(msg);
      return false;
    };
    
    // (E) ENABLE FORM
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
  //added download method
  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(_voices_avail, 'js_tts.txt', 'text/plain');
};

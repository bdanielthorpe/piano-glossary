// Wait until the HTML is 100% loaded before running any code
window.addEventListener('DOMContentLoaded', () => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const keyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]; 
  
    const slider = document.getElementById('root-slider');
    const label = document.getElementById('root-label');
    const keyboard = document.getElementById('keyboard');
  
    // Safety Check: If the HTML elements aren't found, stop and report it
    if (!slider || !label || !keyboard) {
      console.error("Piano Widget: Missing HTML elements! Check your IDs in index.html.");
      return;
    }
  
    // Function to build the keys
    function buildKeyboard() {
      keyboard.innerHTML = '';
      for (let i = 0; i < 24; i++) {
        const key = document.createElement('div');
        const noteIndex = i % 12;
        
        key.classList.add('key');
        if (keyPattern[noteIndex] === 1) {
          key.classList.add('black');
        }
        
        key.dataset.index = i;
        keyboard.appendChild(key);
      }
    }
  
    // Function to light up the chord
    function updateChordVisual() {
      const rootIndex = parseInt(slider.value);
      label.textContent = notes[rootIndex];
  
      const allKeys = document.querySelectorAll('.key');
      allKeys.forEach(k => k.classList.remove('active', 'root-active'));
  
      const chordIntervals = [0, 4, 7]; // Major Chord
  
      chordIntervals.forEach((interval, i) => {
        const targetIndex = rootIndex + interval;
        const targetKey = document.querySelector(`[data-index="${targetIndex}"]`);
        
        if (targetKey) {
          if (i === 0) {
            targetKey.classList.add('root-active');
          } else {
            targetKey.classList.add('active');
          }
        }
      });
    }
  
    // Run the widget
    buildKeyboard();
    updateChordVisual();
  
    // Listen for slider changes
    slider.addEventListener('input', updateChordVisual);
    console.log("Piano Widget successfully initialized!");
  });
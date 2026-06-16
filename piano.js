// Data mapping for the 12 chromatic notes
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Define standard piano key structure (0 = white, 1 = black)
// This pattern represents one full octave starting from C
const keyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]; 

// Grab the elements from your HTML
const slider = document.getElementById('root-slider');
const label = document.getElementById('root-label');
const keyboard = document.getElementById('keyboard');

// Dynamically build the visual keyboard HTML
function buildKeyboard() {
  keyboard.innerHTML = '';
  // Loop twice (24 keys) to show 2 full octaves so chord shapes don't cut off
  for (let i = 0; i < 24; i++) {
    const key = document.createElement('div');
    const noteIndex = i % 12; // Maps 0-23 back to the 12 notes array
    
    key.classList.add('key');
    
    // If the pattern says 1, make it a black key
    if (keyPattern[noteIndex] === 1) {
      key.classList.add('black');
    }
    
    // Attach a data attribute so we can target this specific key later
    key.dataset.index = i;
    keyboard.appendChild(key);
  }
}

// Calculate intervals and light up the keys
function updateChordVisual() {
  const rootIndex = parseInt(slider.value);
  
  // Update the text label so you know what root note is selected
  label.textContent = notes[rootIndex];

  // Clear all previously highlighted keys before calculating the new ones
  const allKeys = document.querySelectorAll('.key');
  allKeys.forEach(k => k.classList.remove('active', 'root-active'));

  // Define a Major Chord formula: [Root, Major 3rd (+4 semitones), Perfect 5th (+7 semitones)]
  const chordIntervals = [0, 4, 7];

  // Loop through the formula and light up the correct keys
  chordIntervals.forEach((interval, i) => {
    const targetIndex = rootIndex + interval;
    const targetKey = document.querySelector(`[data-index="${targetIndex}"]`);
    
    if (targetKey) {
      if (i === 0) {
        targetKey.classList.add('root-active'); // Color the root note differently
      } else {
        targetKey.classList.add('active'); // Color the supporting chord notes
      }
    }
  });
}

// Initialize the widget
buildKeyboard();
updateChordVisual(); // Run once on page load to show the default C Major chord

// Listen for the slider moving and update the keys instantly
slider.addEventListener('input', updateChordVisual);
// 1. Data mapping for the 12 chromatic notes
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// 2. Define standard piano key structure (0 = white, 1 = black)
// This pattern represents one full octave starting from C
const keyPattern = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]; 

const slider = document.getElementById('root-slider');
const label = document.getElementById('root-label');
const keyboard = document.getElementById('keyboard');

// 3. Dynamically build the visual keyboard html
function buildKeyboard() {
  keyboard.innerHTML = '';
  // Loop twice (24 keys) to show 2 full octaves so notes don't cut off
  for (let i = 0; i < 24; i++) {
    const key = document.createElement('div');
    const noteIndex = i % 12; // Maps 0-23 back to the 12 notes array
    
    key.classList.add('key');
    if (keyPattern[noteIndex] === 1) {
      key.classList.add('black');
    }
    
    // Attach a data attribute so we can target this specific index later
    key.dataset.index = i;
    keyboard.appendChild(key);
  }
}

// 4. Calculate intervals and light up the keys
function updateChordVisual() {
  const rootIndex = parseInt(slider.value);
  label.textContent = notes[rootIndex];

  // Clear all previous active keys
  const allKeys = document.querySelectorAll('.key');
  allKeys.forEach(k => k.classList.remove('active', 'root-active'));

  // Define a Major Chord formula: [Root, Major 3rd (+4), Perfect 5th (+7)]
  // If you want a minor chord later, change 4 to 3!
  const chordIntervals = [0, 4, 7];

  chordIntervals.forEach((interval, i) => {
    const targetIndex = rootIndex + interval;
    const targetKey = document.querySelector(`[data-index="${targetIndex}"]`);
    
    if (targetKey) {
      if (i === 0) {
        targetKey.classList.add('root-active'); // Color the root red
      } else {
        targetKey.classList.add('active'); // Color the supporting notes blue
      }
    }
  });
}

// 5. Initialize & Event Listeners
buildKeyboard();
updateChordVisual(); // Run once on page load

slider.addEventListener('input', updateChordVisual);
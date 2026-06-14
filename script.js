/* ================================================================
   LINGUAFLOW — script.js
   Every feature explained line by line.
   ================================================================ */

/* ----------------------------------------------------------------
   STEP 1: GRAB ALL HTML ELEMENTS
   document.getElementById() finds the element with that id=""
   in the HTML. We store them in variables so we can use them.
---------------------------------------------------------------- */

// NAVBAR
const historyToggleBtn = document.getElementById('historyToggleBtn');
const themeToggleBtn   = document.getElementById('themeToggleBtn');
const themeIcon        = document.getElementById('themeIcon');
const historyBadge     = document.getElementById('historyBadge');

// LANGUAGE SELECTS
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const swapBtn    = document.getElementById('swapBtn');

// SOURCE CARD
const sourceText  = document.getElementById('sourceText');
const charCount   = document.getElementById('charCount');
const charCounter = document.getElementById('charCounter');
const micBtn      = document.getElementById('micBtn');
const clearBtn    = document.getElementById('clearBtn');
const sourceCard  = document.getElementById('sourceCard');

// OUTPUT CARD
const outputArea        = document.getElementById('outputArea');
const outputText        = document.getElementById('outputText');
const outputPlaceholder = document.getElementById('outputPlaceholder');
const loadingSkeleton   = document.getElementById('loadingSkeleton');
const detectedLang      = document.getElementById('detectedLang');
const outputCard        = document.getElementById('outputCard');

// OUTPUT TOOLBAR BUTTONS
const speakBtn    = document.getElementById('speakBtn');
const copyBtn     = document.getElementById('copyBtn');
const copyIcon    = document.getElementById('copyIcon');
const downloadBtn = document.getElementById('downloadBtn');

// TRANSLATE BUTTON
const translateBtn     = document.getElementById('translateBtn');
const translateBtnText = document.getElementById('translateBtnText');

// ERROR BANNER
const errorBanner  = document.getElementById('errorBanner');
const errorMessage = document.getElementById('errorMessage');
const errorClose   = document.getElementById('errorClose');

// HISTORY PANEL
const historyPanel    = document.getElementById('historyPanel');
const historyList     = document.getElementById('historyList');
const historyEmpty    = document.getElementById('historyEmpty');
const historyCloseBtn = document.getElementById('historyCloseBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const historyBackdrop = document.getElementById('historyBackdrop');

// TOAST
const toast        = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');


/* ----------------------------------------------------------------
   STEP 2: LANGUAGE LIST
   An array of objects. Each object has:
   - code: the language code used by the translation API
   - name: the human-readable name shown in the dropdown
---------------------------------------------------------------- */
const LANGUAGES = [
  { code: 'en',    name: 'English' },
  { code: 'ta',    name: 'Tamil' },
  { code: 'hi',    name: 'Hindi' },
  { code: 'es',    name: 'Spanish' },
  { code: 'fr',    name: 'French' },
  { code: 'de',    name: 'German' },
  { code: 'zh',    name: 'Chinese' },
  { code: 'ar',    name: 'Arabic' },
  { code: 'pt',    name: 'Portuguese' },
  { code: 'ru',    name: 'Russian' },
  { code: 'ja',    name: 'Japanese' },
  { code: 'ko',    name: 'Korean' },
  { code: 'it',    name: 'Italian' },
  { code: 'nl',    name: 'Dutch' },
  { code: 'tr',    name: 'Turkish' },
  { code: 'pl',    name: 'Polish' },
  { code: 'sv',    name: 'Swedish' },
  { code: 'da',    name: 'Danish' },
  { code: 'fi',    name: 'Finnish' },
  { code: 'no',    name: 'Norwegian' },
  { code: 'id',    name: 'Indonesian' },
  { code: 'ms',    name: 'Malay' },
  { code: 'th',    name: 'Thai' },
  { code: 'vi',    name: 'Vietnamese' },
  { code: 'uk',    name: 'Ukrainian' },
  { code: 'cs',    name: 'Czech' },
  { code: 'ro',    name: 'Romanian' },
  { code: 'hu',    name: 'Hungarian' },
  { code: 'el',    name: 'Greek' },
  { code: 'he',    name: 'Hebrew' },
  { code: 'bn',    name: 'Bengali' },
  { code: 'ml',    name: 'Malayalam' },
  { code: 'te',    name: 'Telugu' },
  { code: 'kn',    name: 'Kannada' },
  { code: 'mr',    name: 'Marathi' },
  { code: 'gu',    name: 'Gujarati' },
  { code: 'pa',    name: 'Punjabi' },
  { code: 'ur',    name: 'Urdu' },
  { code: 'fa',    name: 'Persian' },
  { code: 'sw',    name: 'Swahili' },
  { code: 'af',    name: 'Afrikaans' },
  { code: 'sq',    name: 'Albanian' },
  { code: 'hy',    name: 'Armenian' },
  { code: 'az',    name: 'Azerbaijani' },
  { code: 'eu',    name: 'Basque' },
  { code: 'bs',    name: 'Bosnian' },
  { code: 'bg',    name: 'Bulgarian' },
  { code: 'ca',    name: 'Catalan' },
  { code: 'hr',    name: 'Croatian' },
  { code: 'et',    name: 'Estonian' },
  { code: 'ka',    name: 'Georgian' },
  { code: 'is',    name: 'Icelandic' },
  { code: 'lv',    name: 'Latvian' },
  { code: 'lt',    name: 'Lithuanian' },
  { code: 'mk',    name: 'Macedonian' },
  { code: 'mt',    name: 'Maltese' },
  { code: 'mn',    name: 'Mongolian' },
  { code: 'sk',    name: 'Slovak' },
  { code: 'sl',    name: 'Slovenian' },
  { code: 'sr',    name: 'Serbian' },
  { code: 'tl',    name: 'Filipino' },
  { code: 'ne',    name: 'Nepali' },
  { code: 'si',    name: 'Sinhala' },
  { code: 'km',    name: 'Khmer' },
  { code: 'lo',    name: 'Lao' },
  { code: 'my',    name: 'Burmese' },
  { code: 'cy',    name: 'Welsh' },
  { code: 'ga',    name: 'Irish' },
  { code: 'gl',    name: 'Galician' },
  { code: 'la',    name: 'Latin' },
];


/* ----------------------------------------------------------------
   STEP 3: POPULATE LANGUAGE DROPDOWNS
   This function runs once on page load.
   It creates <option> elements inside both <select> dropdowns.
---------------------------------------------------------------- */
function populateLanguages() {
  // Sort alphabetically by name
  const sorted = [...LANGUAGES].sort((a, b) => a.name.localeCompare(b.name));

  // Loop through each language and create an <option> for both selects
  sorted.forEach(lang => {
    // Create a new <option> HTML element
    const opt1 = document.createElement('option');
    opt1.value       = lang.code;   // The value sent to the API
    opt1.textContent = lang.name;   // The text the user sees

    const opt2 = opt1.cloneNode(true); // Clone it for the second dropdown

    sourceLang.appendChild(opt1); // Add to "From" dropdown
    targetLang.appendChild(opt2); // Add to "To" dropdown
  });

  // Set default selections: English → Tamil
  sourceLang.value = 'en';
  targetLang.value = 'ta';
}


/* ----------------------------------------------------------------
   STEP 4: THEME TOGGLE (Dark / Light mode)
   Reads the current theme from <html data-theme="">
   and switches between "dark" and "light".
---------------------------------------------------------------- */
function initTheme() {
  // Check if user had previously selected a theme (stored in browser)
  const saved = localStorage.getItem('linguaflow-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function updateThemeIcon(theme) {
  // Switch icon between moon (dark mode) and sun (light mode)
  themeIcon.className = theme === 'dark' ? 'ph ph-moon' : 'ph ph-sun';
}

// EVENT: When theme button is clicked
themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';

  // Apply new theme to the <html> element (CSS variables auto-update)
  document.documentElement.setAttribute('data-theme', next);
  // Remember the choice in localStorage (survives page refresh)
  localStorage.setItem('linguaflow-theme', next);
  updateThemeIcon(next);
});


/* ----------------------------------------------------------------
   STEP 5: CHARACTER COUNTER
   Updates every time the user types in the source text area.
   Shows warning color when approaching the 5000 character limit.
---------------------------------------------------------------- */
sourceText.addEventListener('input', () => {
  const len = sourceText.value.length;
  charCount.textContent = len;

  // Turn counter red when > 4500 characters
  if (len > 4500) {
    charCounter.classList.add('warning');
  } else {
    charCounter.classList.remove('warning');
  }
});


/* ----------------------------------------------------------------
   STEP 6: SWAP LANGUAGES BUTTON
   Swaps the selected language codes in both dropdowns.
   Also swaps the text content if any translation exists.
---------------------------------------------------------------- */
swapBtn.addEventListener('click', () => {
  // Read current values
  const fromVal = sourceLang.value;
  const toVal   = targetLang.value;

  // Swap them
  sourceLang.value = toVal;
  targetLang.value = fromVal;

  // Also swap the text content between boxes
  const currentOutput = outputText.textContent.trim();
  const currentInput  = sourceText.value.trim();

  if (currentOutput) {
    sourceText.value       = currentOutput;
    outputText.textContent = currentInput;
    charCount.textContent  = currentOutput.length;
  }

  // Play a spin animation on the swap icon
  swapBtn.classList.add('spinning');
  // Remove the class after the animation ends so it can be triggered again
  swapBtn.addEventListener('animationend', () => {
    swapBtn.classList.remove('spinning');
  }, { once: true }); // { once: true } means this listener runs only one time
});


/* ----------------------------------------------------------------
   STEP 7: CLEAR BUTTON
   Clears the source textarea and the output area.
   Also resets the character counter and disables output buttons.
---------------------------------------------------------------- */
clearBtn.addEventListener('click', () => {
  sourceText.value       = '';
  outputText.textContent = '';
  charCount.textContent  = '0';
  charCounter.classList.remove('warning');

  // Show placeholder again in output
  outputPlaceholder.style.display = 'block';

  // Disable the output action buttons (nothing to copy/speak/download)
  speakBtn.disabled    = true;
  copyBtn.disabled     = true;
  downloadBtn.disabled = true;

  // Hide detected language pill
  detectedLang.classList.remove('visible');
  detectedLang.textContent = '';

  // Remove any error
  hideError();

  // Focus back on the text area for smooth UX
  sourceText.focus();
});


/* ----------------------------------------------------------------
   STEP 8: TRANSLATE FUNCTION
   The core feature. Calls the MyMemory API (free, no key needed).
   API URL format:
   https://api.mymemory.translated.net/get?q=YOURTEXT&langpair=en|fr
---------------------------------------------------------------- */
async function translateText() {
  const text = sourceText.value.trim();

  // Guard: Don't translate if input is empty
  if (!text) {
    showError('Please enter some text to translate.');
    sourceText.focus();
    return;
  }

  const from = sourceLang.value;
  const to   = targetLang.value;

  // Guard: Don't translate if same language selected
  if (from === to) {
    showError('Source and target languages are the same.');
    return;
  }

  // --- START LOADING STATE ---
  setLoadingState(true);
  hideError();

  try {
    // Build the API URL
    // encodeURIComponent() converts special characters (spaces, accents)
    // so they are safe to send in a URL
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

    // fetch() sends an HTTP GET request to the URL
    // await means "wait here until the response comes back"
    const response = await fetch(url);

    // Check if the HTTP request itself failed (e.g. no internet)
    if (!response.ok) {
      throw new Error(`Network error: ${response.status}`);
    }

    // Parse the JSON response body into a JavaScript object
    const data = await response.json();

    // The API returns a responseStatus code:
    // 200 = success, 403 = quota exceeded, 429 = rate limited
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed. Try again.');
    }

    // Extract the translated text from the response
    const translated = data.responseData.translatedText;

    // Check for empty result
    if (!translated) {
      throw new Error('No translation returned. Try different text.');
    }

    // --- SHOW THE RESULT ---
    displayTranslation(translated, from, to);

    // Save to history
    saveToHistory(text, translated, from, to);

  } catch (err) {
    // If anything above threw an error, we land here
    showError(err.message || 'Translation failed. Check your internet connection.');
  } finally {
    // finally always runs — whether success or error
    // Stop the loading state
    setLoadingState(false);
  }
}

// Trigger translate on button click
translateBtn.addEventListener('click', (e) => {
  // Create a ripple effect at the click position
  createRipple(e, translateBtn);
  translateText();
});

// Also translate when user presses Ctrl+Enter in the textarea
sourceText.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    translateText();
  }
});


/* ----------------------------------------------------------------
   STEP 9: LOADING STATE
   Shows/hides the skeleton loader and changes the button text.
   Also adds the rotating border animation on the cards.
---------------------------------------------------------------- */
function setLoadingState(isLoading) {
  if (isLoading) {
    // Disable the button to prevent double-click
    translateBtn.classList.add('loading');
    translateBtnText.textContent = 'Translating...';

    // Show skeleton, hide output text and placeholder
    outputPlaceholder.style.display = 'none';
    outputText.textContent          = '';
    loadingSkeleton.style.display   = 'flex';

    // Add rotating border animation to both cards
    sourceCard.classList.add('translating');
    outputCard.classList.add('translating');

    // Disable output buttons
    speakBtn.disabled    = true;
    copyBtn.disabled     = true;
    downloadBtn.disabled = true;

  } else {
    // Restore button
    translateBtn.classList.remove('loading');
    translateBtnText.textContent = 'Translate';

    // Hide skeleton
    loadingSkeleton.style.display = 'none';

    // Remove border animation
    sourceCard.classList.remove('translating');
    outputCard.classList.remove('translating');
  }
}


/* ----------------------------------------------------------------
   STEP 10: DISPLAY TRANSLATION
   Fills the output area with the translated text.
   Enables the output action buttons.
---------------------------------------------------------------- */
function displayTranslation(text, from, to) {
  // Hide placeholder
  outputPlaceholder.style.display = 'none';

  // Set the translated text
  outputText.textContent = text;

  // Show the language pair pill (e.g. "en → ta")
  detectedLang.textContent = `${from.toUpperCase()} → ${to.toUpperCase()}`;
  detectedLang.classList.add('visible');

  // Enable output buttons now that there's something to act on
  speakBtn.disabled    = false;
  copyBtn.disabled     = false;
  downloadBtn.disabled = false;
}


/* ----------------------------------------------------------------
   STEP 11: RIPPLE EFFECT
   Creates a visual ripple circle expanding from where you clicked.
   The circle is a <span> inserted into the button temporarily.
---------------------------------------------------------------- */
function createRipple(event, button) {
  // Get the button's position on screen
  const rect   = button.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);

  // Calculate where inside the button the click happened
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top  - size / 2;

  // Create a <span> element for the ripple
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.width  = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left   = `${x}px`;
  ripple.style.top    = `${y}px`;

  // Add it to the button
  button.appendChild(ripple);

  // Remove after animation completes (0.6s defined in CSS)
  ripple.addEventListener('animationend', () => ripple.remove());
}


/* ----------------------------------------------------------------
   STEP 12: VOICE INPUT (Web Speech API)
   The SpeechRecognition API is built into browsers.
   No external library needed.
   It converts spoken words into text in real time.
---------------------------------------------------------------- */

// Check if the browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecording = false;

if (SpeechRecognition) {
  // Create a speech recognition instance
  recognition = new SpeechRecognition();
  recognition.continuous    = false;  // Stop after one sentence
  recognition.interimResults = true;  // Show partial results as you speak

  // EVENT: Called when speech is detected
  // 'results' contains what the browser heard
  recognition.onresult = (event) => {
    // Loop through all results and join the transcript
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    // Put it into the textarea
    sourceText.value = transcript;
    charCount.textContent = transcript.length;
  };

  // EVENT: Called when recognition stops (either by user or automatically)
  recognition.onend = () => {
    stopRecording();
  };

  // EVENT: Called when recognition has an error
  recognition.onerror = (event) => {
    stopRecording();
    if (event.error === 'not-allowed') {
      showError('Microphone access was denied. Please allow microphone permission in your browser.');
    } else if (event.error === 'no-speech') {
      showError('No speech detected. Please try again.');
    } else {
      showError(`Speech error: ${event.error}`);
    }
  };
}

// When the mic button is clicked
micBtn.addEventListener('click', () => {
  if (!SpeechRecognition) {
    showError('Voice input is not supported in this browser. Please use Chrome or Edge.');
    return;
  }

  if (isRecording) {
    // If already recording, stop
    recognition.stop();
    stopRecording();
  } else {
    // Set the language to match the source language dropdown
    recognition.lang = sourceLang.value;
    recognition.start();
    startRecording();
  }
});

function startRecording() {
  isRecording = true;
  micBtn.classList.add('recording');  // CSS adds the pulsing red ring
  micBtn.title = 'Stop recording';
  micBtn.setAttribute('aria-label', 'Stop voice input');
}

function stopRecording() {
  isRecording = false;
  micBtn.classList.remove('recording');
  micBtn.title = 'Voice input';
  micBtn.setAttribute('aria-label', 'Start voice input');
}


/* ----------------------------------------------------------------
   STEP 13: SPEAK TRANSLATION (Web Speech API — Text to Speech)
   The SpeechSynthesis API reads text aloud.
   Also built into browsers, no library needed.
---------------------------------------------------------------- */
speakBtn.addEventListener('click', () => {
  const text = outputText.textContent.trim();
  if (!text) return;

  // If already speaking, stop
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    speakBtn.querySelector('i').className = 'ph ph-speaker-high';
    return;
  }

  // Create an utterance (a thing to be spoken)
  const utterance = new SpeechSynthesisUtterance(text);

  // Set the language to the target language
  utterance.lang  = targetLang.value;
  utterance.rate  = 0.95;   // Slightly slower than default for clarity
  utterance.pitch = 1;

  // Change icon to indicate speaking
  speakBtn.querySelector('i').className = 'ph ph-stop-circle';

  // EVENT: When it finishes speaking
  utterance.onend = () => {
    speakBtn.querySelector('i').className = 'ph ph-speaker-high';
  };

  // Speak!
  window.speechSynthesis.speak(utterance);
});


/* ----------------------------------------------------------------
   STEP 14: COPY TO CLIPBOARD
   Uses the modern Clipboard API.
   Shows a success toast after copying.
---------------------------------------------------------------- */
copyBtn.addEventListener('click', async () => {
  const text = outputText.textContent.trim();
  if (!text) return;

  try {
    // navigator.clipboard.writeText() copies text to the clipboard
    await navigator.clipboard.writeText(text);

    // Visual feedback: change icon to checkmark for 1.5 seconds
    copyIcon.className = 'ph ph-check';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyIcon.className = 'ph ph-copy';
      copyBtn.classList.remove('copied');
    }, 1500);

    showToast('Copied to clipboard!');

  } catch (err) {
    showError('Could not copy to clipboard. Please copy manually.');
  }
});


/* ----------------------------------------------------------------
   STEP 15: DOWNLOAD AS TEXT FILE
   Creates a .txt file in the browser and triggers a download.
   No server needed — it's all done client-side.
---------------------------------------------------------------- */
downloadBtn.addEventListener('click', () => {
  const text = outputText.textContent.trim();
  if (!text) return;

  const from     = sourceLang.options[sourceLang.selectedIndex].text;
  const to       = targetLang.options[targetLang.selectedIndex].text;
  const original = sourceText.value.trim();

  // Build the file content
  const content = [
    'LinguaFlow — Translation',
    '========================',
    '',
    `From: ${from}`,
    `To:   ${to}`,
    `Date: ${new Date().toLocaleString()}`,
    '',
    '--- Original ---',
    original,
    '',
    '--- Translation ---',
    text,
  ].join('\n');

  // Create a Blob (binary large object) — essentially a file in memory
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

  // Create a temporary invisible link element
  const link    = document.createElement('a');
  link.href     = URL.createObjectURL(blob); // Create a URL pointing to the Blob
  link.download = `linguaflow_${from}_to_${to}.txt`; // Filename

  // Programmatically click the link to trigger download
  document.body.appendChild(link);
  link.click();

  // Clean up — remove the link and revoke the URL from memory
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);

  showToast('Translation downloaded!');
});


/* ----------------------------------------------------------------
   STEP 16: ERROR BANNER
   Shows a dismissible error message below the translate button.
   Auto-hides after 5 seconds.
---------------------------------------------------------------- */
function showError(message) {
  errorMessage.textContent = message;
  errorBanner.style.display = 'flex';
  // Clear any previous auto-hide timer
  clearTimeout(window._errorTimer);
  // Auto-hide after 5 seconds
  window._errorTimer = setTimeout(hideError, 5000);
}

function hideError() {
  errorBanner.style.display = 'none';
  clearTimeout(window._errorTimer);
}

// Close button on the error banner
errorClose.addEventListener('click', hideError);


/* ----------------------------------------------------------------
   STEP 17: TOAST NOTIFICATION
   A small pop-up at the bottom for success messages.
   Auto-disappears after 2 seconds.
---------------------------------------------------------------- */
let toastTimer = null;

function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add('show');

  // Clear previous timer if another toast was about to hide
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}


/* ----------------------------------------------------------------
   STEP 18: TRANSLATION HISTORY
   Saves translations to localStorage (persists across browser sessions).
   Max 20 items stored.
---------------------------------------------------------------- */
const HISTORY_KEY = 'linguaflow-history';

// Load history from localStorage, or start with empty array
function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch {
    return [];
  }
}

// Save updated history back to localStorage
function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Add a new item to history
function saveToHistory(source, translated, fromCode, toCode) {
  const history = loadHistory();

  const fromName = LANGUAGES.find(l => l.code === fromCode)?.name || fromCode;
  const toName   = LANGUAGES.find(l => l.code === toCode)?.name   || toCode;

  // Build the history item object
  const item = {
    id:         Date.now(), // Unique ID based on timestamp
    source:     source.slice(0, 100),     // Limit preview length
    translated: translated.slice(0, 100),
    fromCode,
    toCode,
    fromName,
    toName,
    time: new Date().toLocaleTimeString(),
  };

  // Add to the FRONT of the array (newest first)
  history.unshift(item);

  // Keep only the last 20 items
  if (history.length > 20) history.pop();

  saveHistory(history);
  renderHistory();
  updateHistoryBadge();
}

// Renders all history items into the panel
function renderHistory() {
  const history = loadHistory();

  // Remove all existing items (except the empty state div)
  const existing = historyList.querySelectorAll('.history-item');
  existing.forEach(el => el.remove());

  if (history.length === 0) {
    historyEmpty.style.display = 'flex';
    return;
  }

  historyEmpty.style.display = 'none';

  // Create a card for each history item
  history.forEach(item => {
    const div = document.createElement('div');
    div.className  = 'history-item';
    div.setAttribute('role', 'listitem');
    div.title      = 'Click to reload this translation';

    div.innerHTML = `
      <div class="history-item-inner">
        <div class="history-source">${escapeHTML(item.source)}</div>
        <div class="history-langs">
          <span>${item.fromName}</span>
        </div>
      </div>
      <i class="ph ph-arrow-right history-arrow"></i>
      <div class="history-item-inner right">
        <div class="history-target">${escapeHTML(item.translated)}</div>
        <div class="history-langs">
          <span>${item.toName}</span>
          <span style="margin-left:auto; color: var(--text-faint)">${item.time}</span>
        </div>
      </div>
    `;

    // Clicking a history item reloads it into the translator
    div.addEventListener('click', () => {
      sourceText.value = item.source;
      sourceLang.value = item.fromCode;
      targetLang.value = item.toCode;
      charCount.textContent = item.source.length;
      displayTranslation(item.translated, item.fromCode, item.toCode);
      closeHistoryPanel();
    });

    historyList.appendChild(div);
  });
}

// Updates the badge number on the History nav button
function updateHistoryBadge() {
  const history = loadHistory();
  const count   = history.length;

  historyBadge.textContent = count;

  if (count > 0) {
    historyBadge.classList.add('visible');
  } else {
    historyBadge.classList.remove('visible');
  }
}

// Security: prevents user text from being executed as HTML
function escapeHTML(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}


/* ----------------------------------------------------------------
   STEP 19: HISTORY PANEL OPEN / CLOSE
---------------------------------------------------------------- */
function openHistoryPanel() {
  historyPanel.classList.add('open');
  historyPanel.setAttribute('aria-hidden', 'false');
  historyBackdrop.classList.add('visible');
  historyBackdrop.setAttribute('aria-hidden', 'false');
  renderHistory(); // Always re-render in case new items were added
}

function closeHistoryPanel() {
  historyPanel.classList.remove('open');
  historyPanel.setAttribute('aria-hidden', 'true');
  historyBackdrop.classList.remove('visible');
  historyBackdrop.setAttribute('aria-hidden', 'true');
}

// Open when nav History button is clicked
historyToggleBtn.addEventListener('click', () => {
  const isOpen = historyPanel.classList.contains('open');
  isOpen ? closeHistoryPanel() : openHistoryPanel();
});

// Close when X button inside panel is clicked
historyCloseBtn.addEventListener('click', closeHistoryPanel);

// Close when backdrop (outside the panel) is clicked
historyBackdrop.addEventListener('click', closeHistoryPanel);

// Also close panel when user presses Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && historyPanel.classList.contains('open')) {
    closeHistoryPanel();
  }
});

// Clear All button
clearHistoryBtn.addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  updateHistoryBadge();
  showToast('History cleared!');
});


/* ----------------------------------------------------------------
   STEP 20: INITIALISE THE APP
   This function runs once when the page first loads.
   It sets everything up.
---------------------------------------------------------------- */
function init() {
  populateLanguages();   // Fill the dropdowns
  initTheme();           // Apply saved or default theme
  renderHistory();       // Render any saved history
  updateHistoryBadge();  // Show badge count
}

// 'DOMContentLoaded' fires when the HTML has fully loaded
// but before images/fonts finish. Safe to run JS here.
document.addEventListener('DOMContentLoaded', init);
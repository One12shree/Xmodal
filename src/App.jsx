import React, { useState } from "react";

const customDictionary = {
  teh: "the",
  wrok: "work",
  fot: "for",
  exampl: "example",
};

function App() {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const checkSpelling = (value) => {
    setText(value);

    if (value.trim() === "") {
      setSuggestion("");
      return;
    }

    // Split into individual words
    const words = value.split(/\s+/);

    // Search for first incorrect word
    for (let word of words) {
      const lower = word.toLowerCase();

      if (customDictionary[lower]) {
        setSuggestion(`Did you mean: ${customDictionary[lower]}?`);
        return;
      }
    }

    // No misspellings found
    setSuggestion("");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Spell Check and Auto-Correction</h1>

      <textarea
        placeholder="Enter text..."
        value={text}
        onChange={(e) => checkSpelling(e.target.value)}
        style={styles.textarea}
      ></textarea>

      {suggestion && (
        <p style={styles.suggestion}>{suggestion}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    margin: "40px auto",
    padding: "20px",
    width: "80%",
    border: "1px solid #ccc",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  textarea: {
    width: "400px",
    height: "120px",
    padding: "10px",
    fontSize: "16px",
  },
  suggestion: {
    marginTop: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default App;

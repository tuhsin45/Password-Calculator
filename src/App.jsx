import { useState, useCallback } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [nums, setNums] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+-~=";

    let characters = letters;
    if (nums) characters += numbers;
    if (chars) characters += specialChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    return generatedPassword;
  }, [length, nums, chars]);

  const handleGeneratePassword = () => {
    const newPassword = passwordGenerator();
    setPassword(newPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="form">
        <div className="form-group">
          <label>
            Length:
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="1"
              max="20"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Include Numbers:
            <input
              type="checkbox"
              checked={nums}
              onChange={(e) => setNums(e.target.checked)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Include Special Characters:
            <input
              type="checkbox"
              checked={chars}
              onChange={(e) => setChars(e.target.checked)}
            />
          </label>
        </div>
        <button className="generate-button" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
      <div className="password-box">
        <h2>Generated Password:</h2>
        <div className="password-container">
          <span className="password">{password}</span>
          <button className="copy-button" onClick={handleCopyPassword}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

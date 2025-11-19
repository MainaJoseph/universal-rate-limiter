// React Example - Test the useRateLimit hook
import { useState } from "react";
import { useRateLimit } from "../../dist/index.mjs";

function SubmitButton() {
  const { allowed, remaining, attempt, retryAfter } = useRateLimit("submit-form", {
    max: 3,
    window: "1m",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const isAllowed = await attempt();

    if (isAllowed) {
      setMessage(`✓ Form submitted successfully! ${remaining} submissions remaining.`);
      console.log("Form submitted!");
    } else {
      const retrySeconds = Math.ceil(retryAfter / 1000);
      setMessage(`✗ Too many submissions. Please wait ${retrySeconds} seconds.`);
      console.log("Rate limit exceeded");
    }
  };

  return (
    <div style={styles.section}>
      <h3>Test 1: Form Submission Rate Limiting</h3>
      <p>Limit: <code>3 submissions per minute</code></p>
      <button
        onClick={handleSubmit}
        disabled={!allowed}
        style={{
          ...styles.button,
          ...(allowed ? {} : styles.buttonDisabled)
        }}
      >
        Submit Form ({remaining} remaining)
      </button>
      {message && (
        <div style={message.includes('✓') ? styles.success : styles.error}>
          {message}
        </div>
      )}
    </div>
  );
}

function DownloadButton() {
  const { allowed, remaining, attempt, retryAfter } = useRateLimit("download-file", {
    max: 5,
    window: "30s",
  });
  const [downloads, setDownloads] = useState(0);
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    const isAllowed = await attempt();

    if (isAllowed) {
      setDownloads(d => d + 1);
      setMessage(`✓ Download #${downloads + 1} started! ${remaining} downloads remaining.`);
      console.log(`Download #${downloads + 1} started`);
    } else {
      const retrySeconds = Math.ceil(retryAfter / 1000);
      setMessage(`✗ Download limit exceeded. Please wait ${retrySeconds} seconds.`);
      console.log("Download rate limit exceeded");
    }
  };

  return (
    <div style={styles.section}>
      <h3>Test 2: Download Rate Limiting</h3>
      <p>Limit: <code>5 downloads per 30 seconds</code></p>
      <button
        onClick={handleDownload}
        disabled={!allowed}
        style={{
          ...styles.button,
          ...(allowed ? {} : styles.buttonDisabled)
        }}
      >
        Download File ({remaining} remaining)
      </button>
      <div style={styles.stats}>
        Total Downloads: {downloads}
      </div>
      {message && (
        <div style={message.includes('✓') ? styles.success : styles.error}>
          {message}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={styles.container}>
      <h1>🌐 Universal Rate Limiter</h1>
      <p style={styles.subtitle}>React Hook Test (useRateLimit)</p>

      <SubmitButton />
      <DownloadButton />

      <div style={styles.instructions}>
        <h3>Instructions</h3>
        <ul>
          <li>Click the buttons multiple times to test rate limiting</li>
          <li>Watch the "remaining" counter decrease with each click</li>
          <li>When limit is exceeded, buttons become disabled</li>
          <li>Open DevTools Console to see detailed logs</li>
          <li>Each component has its own independent rate limit</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
  },
  subtitle: {
    color: "#666",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "30px",
    padding: "20px",
    background: "#f9f9f9",
    borderRadius: "4px",
    borderLeft: "4px solid #007bff",
  },
  button: {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },
  buttonDisabled: {
    background: "#ccc",
    cursor: "not-allowed",
  },
  success: {
    marginTop: "15px",
    padding: "15px",
    background: "#d4edda",
    color: "#155724",
    border: "1px solid #c3e6cb",
    borderRadius: "4px",
  },
  error: {
    marginTop: "15px",
    padding: "15px",
    background: "#f8d7da",
    color: "#721c24",
    border: "1px solid #f5c6cb",
    borderRadius: "4px",
  },
  stats: {
    marginTop: "10px",
    padding: "10px",
    background: "#e7f3ff",
    borderRadius: "3px",
    display: "inline-block",
  },
  instructions: {
    marginTop: "30px",
    padding: "20px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default App;

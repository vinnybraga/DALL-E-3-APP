import Head from "next/head";
import { useState } from "react";

import styles from "../styles/Home.module.css";

import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getImages() {
    if (token != "" && prompt != "") {
      setError(false);
      setLoading(true);
      axios
        .post(`/api/images?t=${token}&p=${prompt}`)
        .then((res) => {
          setResult(res.data.result[0]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  }

  const [type, setType] = useState("webp");

  function download(url) {
    axios
      .post(`/api/download`, { url: url, type: type })
      .then((res) => {
        const link = document.createElement("a");
        link.href = res.data.result;
        link.download = `${prompt}.${type.toLowerCase()}`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Images With DALL-E 3 App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create images with <span className={styles.titleColor}>DALL-E 3</span>
        </h1>
        <p className={styles.description}>
          <input
            id="token"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Bearer Token (sk-...)"
          />
          <textarea
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Prompt"
          />
          <button onClick={getImages}>Get Image</button>
        </p>
        <small>
          Download as:
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="webp">Webp</option>
            <option value="png">Png</option>
            <option value="jpg">Jpg</option>
            <option value="gif">Gif</option>
            <option value="avif">Avif</option>
          </select>{" "}
          Click the image below and save.
        </small>
        <br />
        {error ? (
          <div className={styles.error}>Something went wrong. Try again.</div>
        ) : (
          <></>
        )}
        {loading && <p>Loading...</p>}
        <div className={styles.grid}>
          <div className={styles.card}>
            <img
              className={styles.imgPreview}
              src={result?.url}
              onClick={() => download(result.url)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

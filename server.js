const express = require("express");
const edgeTTS = require("edge-tts");
const app = express();
const port = process.env.PORT || 3000;

app.get("/speak", async (req, res) => {
  const text = req.query.text;
  const voice = req.query.voice || "pt-BR-AntonioNeural";

  if (!text) return res.status(400).send("Faltando texto");

  try {
    const tts = await edgeTTS.stream({
      text,
      voice,
    });

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "inline; filename=voz.mp3",
    });

    tts.stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar áudio");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('IP Lock está funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// 1. Lista de IPs permitidos (EDITE AQUI)
const allowedIPs = ["168.90.152.91"];

// 2. Função que verifica o IP
async function checkIP() {
  try {
    // Obter IP do usuário
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const userIP = (await ipResponse.json()).ip;
    
    // Verificar se está na lista
    if (!allowedIPs.includes(userIP)) {
      // Redirecionar para YouTube
      window.open("https://youtube.com", "_blank");
      window.location.href = "https://youtube.com";
      return;
    }
    
    // Se o IP for válido:
    console.log("✅ Acesso permitido para:", userIP);
    // ...seu código continua aqui...
    
  } catch (error) {
    // Fallback em caso de erro
    window.location.href = "https://youtube.com";
  }
}

// 3. Executa automaticamente
checkIP();

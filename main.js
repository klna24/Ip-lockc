const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('IP Lock está funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Lógica completa de verificação
async function verifyAccess() {
  // 1. Obter IP do usuário
  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const userIP = (await ipResponse.json()).ip;

  // 2. Lista de IPs permitidos (editável sem mexer no código)
  const allowedIPs = ["168.90.152.91", "exemplo.123.456"]; 

  // 3. Verificação estrita
  if (!allowedIPs.includes(userIP)) {
    return { 
      access: false,
      redirect: "https://youtube.com"
    };
  }

  return { 
    access: true,
    userIP: userIP
  };
}

// Disponibiliza a função globalmente
window.IPLock = { verifyAccess };

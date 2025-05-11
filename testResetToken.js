const axios = require("axios");
const readline = require("readline"); // Para entrada do usuário no terminal

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 🔹 Função para pedir e-mail e chamar a API
function askEmail() {
  rl.question("Digite seu e-mail para receber o token: ", async (email) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/generate-reset-token", { email });
      console.log("Resposta da API:", response.data);
    } catch (error) {
      console.error("Erro ao gerar token:", error.response ? error.response.data : error.message);
    }
    rl.close();
  });
}

askEmail();

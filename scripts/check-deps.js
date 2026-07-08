/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');

// Verifica se a pasta node_modules NÃO existe
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n🚀 [Boilerplate] Primeira execução detectada!');
  console.log('📦 Baixando todas as dependências automaticamente, aguarde...\n');
  
  try {
    // Executa o comando npm install herdando o terminal para mostrar o progresso
    execSync('npm install', { stdio: 'inherit' });
    console.log('\n✅ Dependências instaladas com sucesso! Iniciando o servidor...\n');
  } catch (error) {
    console.error('\n❌ Erro ao instalar as dependências:', error.message);
    process.exit(1);
  }
}
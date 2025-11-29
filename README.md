# ⛓️ Web3-DataFeed-Oracle-PoC (Prova de Conceito de Oráculo)

Uma Prova de Conceito (PoC) que simula o funcionamento de um **Oráculo Descentralizado**. O objetivo central é demonstrar a capacidade de buscar dados externos (*off-chain*) — como preços de mercado, resultados de eventos ou informações de APIs externas — e transmitir de forma segura e confiável para um **Smart Contract** na blockchain (*on-chain*).

Este projeto é fundamental para qualquer aplicação Web3 (dApp) que necessite de informações do mundo real para executar sua lógica.

## 🚀 Tecnologias e Implementação

| Categoria | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend/Execução** | **Node.js** | Ambiente de execução para o script do Oráculo, que é responsável por monitorar, buscar e enviar transações. |
| **Blockchain** | **Solidity** | Linguagem utilizada para o Smart Contract que atua como o **Data Consumer** (contrato que recebe e armazena o dado). |
| **Integração Web3** | **Ethers.js** ou **Web3.js** | Biblioteca utilizada pelo script Node.js para interagir com a EVM, assinar transações com a chave privada do Oráculo e enviar o dado ao contrato. |
| **Busca de Dados** | **Fetch API** ou **Axios** | Cliente HTTP utilizado para buscar o dado da fonte *off-chain* (Ex: uma API de preço de criptomoedas ou API de clima). |
| **Ambiente de Teste** | **Hardhat** ou **Ganache** | Ferramentas essenciais para simular a rede Ethereum localmente, permitindo testes rápidos e debug. |

## 💡 Objetivo e Fluxo de Dados (O Ciclo do Oráculo)

Este PoC demonstra um ciclo de vida de comunicação **Off-Chain ↔ On-Chain** acionado por um evento ou solicitação:

1.  **Monitoramento (Off-Chain):** O script Node.js do Oráculo é inicializado para monitorar o *log* da rede ou um *endpoint* específico em busca de solicitações de dados.
2.  **Busca de Dados (Off-Chain):** O script faz uma chamada HTTP para a API externa (a fonte de dados confiável) e recupera a informação necessária (Ex: O preço atual de um ativo).
3.  **Entrega do Dado (On-Chain):** Utilizando a chave privada do Oráculo, o script Node.js assina uma transação e chama uma função específica no Smart Contract (Ex: `updateData(novoValor)`), escrevendo o novo dado de forma permanente na blockchain.

## 🛠 Como Testar e Configurar

### Pré-requisitos
* Node.js (LTS recomendado)
* Conta com ETH de teste (Ex: na Sepolia) para o endereço da conta que atuará como o Oráculo.

### Passos

1.  **Clone o Repositório:**
    ```bash
    git clone [https://docs.github.com/pt/repositories/creating-and-managing-repositories/creating-a-new-repository](https://docs.github.com/pt/repositories/creating-and-managing-repositories/creating-a-new-repository)
    cd Web3-DataFeed-Oracle-PoC
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Deploy do Contrato:**
    Utilize o Hardhat ou a ferramenta de sua preferência para fazer o deploy do contrato Solidity na rede local ou de teste:
    ```bash
    npx hardhat run scripts/deploy.js --network [SUA_REDE]
    ```

5.  **Execução do Oráculo:**
    Inicie o script Node.js que irá executar o fluxo de busca de dados e enviar a transação de atualização:
    ```bash
    node oracle-script/fetchAndPush.js
    ```

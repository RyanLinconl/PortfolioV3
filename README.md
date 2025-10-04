## 📄 Sobre o Projeto

Bem-vindo ao repositório do meu portfólio pessoal! Este é um projeto desenvolvido para apresentar minhas habilidades, projetos e trajetória como **Desenvolvedor Full Stack**. A aplicação foi construída do zero utilizando as tecnologias mais modernas do ecossistema JavaScript, com foco em performance, experiência do usuário e escalabilidade.

O objetivo deste portfólio vai além de uma simples vitrine: ele serve como uma demonstração prática das minhas competências em desenvolvimento front-end, back-end, integrações com IA e boas práticas de UI/UX.

## 🖼️ Visualização

_**Dica:** Adicione aqui um screenshot ou GIF do seu portfólio para causar uma ótima primeira impressão!_

![prévia-do-portfolio](https://user-images.githubusercontent.com/LINK-PARA-SUA-IMAGEM.png)

## ✨ Funcionalidades Principais

O portfólio conta com diversas funcionalidades implementadas para criar uma experiência interativa e completa para o visitante:

* **🤖 Assistente Virtual com IA:** Um chatbot integrado que age como meu assistente pessoal. Ele é capaz de responder perguntas sobre minha carreira, habilidades e projetos, fornecendo informações úteis para recrutadores e clientes de forma conversacional.
* **🌐 Suporte a Múltiplos Idiomas (i18n):** Toda a interface do site pode ser alternada entre Português (pt-BR) e Inglês (en-US), garantindo acessibilidade para um público global.
* **🕰️ Máquina do Tempo de Versões:** Uma funcionalidade única que permite ao visitante viajar por versões anteriores do meu portfólio, exibindo a evolução do meu trabalho e das minhas habilidades ao longo do tempo.
* **🎨 Animações e Microinterações:** Utilização da biblioteca `Framer Motion` para criar animações fluidas e microinterações que tornam a navegação mais agradável e intuitiva.
* **🌗 Tema Dark/Light:** Suporte a temas claro e escuro, com sincronização automática baseada na preferência do sistema operacional do usuário.
* **📱 Design Totalmente Responsivo:** A interface se adapta perfeitamente a qualquer tamanho de tela, seja em desktops, tablets ou smartphones.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e robusto:

### **Front-end:**
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Internacionalização:** [react-i18next](https://react.i18next.com/)

### **Back-end & Banco de Dados:**
* **Ambiente de Execução:** [Node.js](https://nodejs.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)

### **Deploy:**
* **Plataforma:** [Vercel](https://vercel.com/)

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example`.
    * Principalmente, configure a sua `DATABASE_URL`.
    ```env
    # .env.example
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/DATABASE?schema=public"
    ```

4.  **Execute as migrations do banco de dados:**
    * O Prisma irá criar as tabelas necessárias no seu banco de dados PostgreSQL.
    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

6.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📫 Contato

**Ryan Lira**

* **LinkedIn:** [https://www.linkedin.com/in/o-ryan-lira/](https://www.linkedin.com/in/o-ryan-lira/)
* **GitHub:** [@RyanLinconl](https://github.com/RyanLinconl)
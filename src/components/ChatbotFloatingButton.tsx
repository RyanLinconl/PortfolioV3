'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  inline?: boolean;
}

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children?: React.ReactNode;
}

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

interface Message {
  id: string;
  text: string;
  role: 'user' | 'assistant';
}

declare global {
  interface Window {
    tooltipDismissed?: boolean;
  }
}

export function ChatbotFloatingButton() {
  const { t } = useTranslation('translation');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [showTooltip, setShowTooltip] = useState(() => {
    if (typeof window !== 'undefined' && window.tooltipDismissed) {
      return false;
    }
    return true;
  });

  const systemPrompt = `Você é o Assistente Virtual do portfólio de Ryan Lira. Seu objetivo principal é: atrair recrutadores e clientes, explicar as competências e projetos do Ryan e responder FAQs e curiosidades sobre ele de forma clara e útil.

IDENTIDADE
- Nome autoidentificação: "Assistente do Ryan Lira — posso ajudar com informações sobre formação, experiência, skills, projetos e curiosidades."
- Objetivo: ajudar recrutadores, clientes e curiosos a entender quem é o Ryan, o que ele faz e como contatá-lo.

TOM E LINGUAGEM
- Tom: profissional, descontraído e levemente humorado; evite piadas fora do contexto profissional.
- Emojis: uso moderado quando apropriado (ex.: 🎮 para games), sem excessos.
- Idioma: detecte automaticamente o idioma do usuário entre pt-BR e EN e responda no mesmo idioma por padrão. Se o usuário pedir outro idioma, confirme.
- Informação importante: o Ryan fala inglês fluente — responda em inglês quando apropriado mantendo o mesmo estilo e tom.

EXTENSÃO E FORMATO
- Respostas padrão: nível médio — 1–3 parágrafos ou 3–6 linhas. Use listas curtas quando ajudar a clareza.
- "Resumo rápido": 1–3 linhas. "Detalhe técnico": explicação média (conceitos, arquitetura, exemplos curtos); **não** gere código executável nem scripts de configuração de ambiente.
- Formato: use Markdown para melhorar a legibilidade quando necessário, como **negrito**, *itálico*, - listas não ordenadas, 1. listas ordenadas, e mini tabelas (ex.: | Coluna1 | Coluna2 |). Para pseudocódigo curto, use blocos de código com \`\`\`pseudocode. Mantenha simples e sem excessos — evite imagens ou elementos complexos.

ESCOPO — O QUE COBRIR
- Pode responder sobre: biografia, formação, experiências profissionais, skills (com níveis), projetos (mini-resumos e links), hobbies, curiosidades, disponibilidade para trabalho, e links públicos.
- Contatos autorizados a serem fornecidos automaticamente:
  - Email: oryanlira@gmail.com
  - LinkedIn: https://www.linkedin.com/in/o-ryan-lira/
  - GitHub: https://github.com/RyanLinconl
- Ao falar de projetos, sempre ofereça ao final um CTA direcionando para o repositório ou para a aba "Projetos" do portfólio (veja regra de CTA abaixo).

RESPONSABILIDADES E ATIVIDADES ATUAIS (usar quando perguntarem sobre o trabalho do Ryan)
- Integração de IA com AISDK.
- Integração de APIs REST com Node.js e Express.
- Desenvolvimento de aplicações server-side em JavaScript/TypeScript.
- Integração front-end ↔ back-end com fetch/axios e controle de credenciais (cookies, headers).
- Tratamento de erros e feedbacks detalhados em APIs (HTTP 4xx/5xx).
- Atualmente trabalha com foco em IA, chatbots e automações.

RESTRIÇÕES E LIMITES
- **Não** responda sobre dados pessoais sensíveis (ex.: CPF, endereço exato, data de nascimento precisa), política ou assuntos que fujam do papel do assistente do Ryan.
- **Não** gere código executável, scripts prontos, comandos de terminal ou guias passo-a-passo de configuração de ambiente. Pode oferecer: explicações conceituais, pseudocódigo curto e links para repositórios relevantes.
- Evite humor que possa ofender ou sair do contexto profissional.
- Nunca invente fatos — se não souber, admita claramente (modelo de resposta abaixo).

COMPORTAMENTO QUANDO NÃO SOUBER
- Use esta resposta padronizada quando faltar informação:
  "Infelizmente não tenho informações suficientes para responder a isso. Quer que eu direcione você para a aba 'Projetos' do portfólio ou forneça os contatos do Ryan para que possam conversar diretamente?"
- Se o usuário pedir algo fora do escopo (ex.: dados sensíveis), recuse educadamente e explique por que não pode ajudar.

REGRAS SOBRE CTA
- **Ofereça CTA somente ao final** quando você estiver explicando ou resumindo um projeto. Exemplo de CTA: "Quer abrir o repositório no GitHub ou ver outros projetos na aba 'Projetos'?"
- Não coloque CTA em respostas que não tratem de projetos (por exemplo: biografia, skills, curiosidades).

PROJETOS — MINI-RESUMOS (usar quando o usuário pedir um resumo rápido)
- Gamy — Assistente virtual nerd sobre games: notícias, dicas, recomendações e curiosidades. Tech: Next.js (App Router), React, CSS Modules, integração com API AI, deploy na Vercel. (GitHub: https://github.com/RyanLinconl/gamy)
- Mikaeru — Jogo de plataforma 2D em Unity + C#: pulo duplo, inimigos com IA básica, parallax, 6 fases e sistema de pontuação. (GitHub: https://github.com/RyanLinconl/mikaeru)
- Opus Check — App de gerenciamento de tarefas (Pomodoro-like) em TypeScript + React + SCSS + CSS Modules: tema claro/escuro, responsivo, cronômetro por tarefa. (repos local — redirecionar à aba Projetos)

CURIOSIDADES (use uma resposta aleatória desta lista quando o usuário pedir curiosidades sobre o Ryan)
- Sou fã de Minecraft desde a Alfa (2009) e ainda jogo; amo a criatividade que o jogo proporciona.
- Meu jogo favorito é Skyrim; tenho uma tatuagem relacionada ao jogo.
- Gosto de edição de vídeos e produzo conteúdo para o YouTube.
- Faço academia desde 2023.
- No tempo livre eu aprimoro projetos de programação, jogo, medito e leio.
- Minha comida favorita é filé à parmegiana.
- Sou muito fã de animes: JoJo, One Punch Man, Hunter x Hunter, Dragon Ball, Demon Slayer e Mob Psycho.

HABILIDADES (resuma quando perguntarem por competências)
- JavaScript (avançado), HTML (avançado), CSS (avançado)
- React (intermediário), TypeScript (intermediário), JSX (intermediário)
- Tailwind CSS (intermediário), SASS (básico)
- Node.js (intermediário), Python (intermediário), APIs (intermediário)
- Responsividade & Acessibilidade (WCAG) (avançado)
- SQL / MySQL, GCP / AWS / Azure, Git/GitHub, Scrum/Kanban, Trello/Jira/Azure DevOps

FORMAÇÃO E EXPERIÊNCIA (resuma quando solicitado)
- Estagiário em desenvolvimento full-stack na Suzano (fev/2025 — presente).
- Certificados relevantes: Next.js 14 (Alura, mai/2025), React (Alura, set/2024), IA generativa (MIT Professional Education, set/2024), IBSEC (jul/2025) e outros cursos listados no portfólio.

PERGUNTAS FREQUENTES (sugestões de respostas rápidas)
- "Quais linguagens você conhece?" → Resuma os níveis das principais skills e ofereça ver projetos que exibam cada skill.
- "Você faz freelance?" → Responda que sim, dependendo da disponibilidade e escopo; ofereça contato (email) se o usuário quiser combinar.

PRIVACIDADE E LOGS
- Não registre nem exponha histórico de conversas do visitante no portfólio.
- Atualizações de conteúdo somente pelo proprietário (Ryan).

EXEMPLOS DE SAÍDA (tom e estilo)
- Resposta sobre projeto (com CTA no final): explique 2–3 parágrafos + CTA: "Quer abrir o repositório no GitHub ou ver mais projetos na aba 'Projetos'?"
- Resposta sobre curiosidade: escolha aleatoriamente um item da lista de curiosidades e entregue em 1–3 frases; eventualmente acrescente um comentário leve e profissional.

FIM — Aja sempre como o assistente do portfólio de Ryan Lira: objetivo claro, honestidade nas limitações, respostas úteis e tom profissional + descontraído.
`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'init',
          role: 'assistant',
          text: t("chat-bot.chat-placeholder"),
        },
      ]);
    }
  }, [isOpen, messages.length, t]);

  const handleToggleChat = () => {
    setIsOpen((prev) => !prev);
    if (showTooltip) {
      setShowTooltip(false);
      if (typeof window !== 'undefined') {
        window.tooltipDismissed = true;
      }
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userInput,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: messages.filter((msg) => msg.id !== 'init'),
          message: userInput,
          system: systemPrompt,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Erro desconhecido na API');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.text ?? 'Desculpe, não consegui processar a resposta.',
      };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Erro no Chatbot (cliente):', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: 'Ocorreu um erro. Tente novamente mais tarde.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showTooltip && !isOpen && (
        <div className="fixed z-50 px-4 py-2 text-sm font-medium rounded-lg shadow-xl pointer-events-none md:bottom-24 bottom-20 md:right-5 right-3 bg-primary text-primary-foreground">
          {t("chat-bot.tooltip")}
          <div className="absolute w-3 h-3 transform rotate-45 -bottom-1 right-6 bg-primary" />
        </div>
      )}

      <Button
        className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg cursor-pointer md:bottom-5 bottom-4 md:right-5 right-4 bg-primary hover:bg-primary/90"
        onClick={handleToggleChat}
        aria-label={isOpen ? "Fechar Chatbot" : "Abrir Chatbot"}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "x" : "message"}
            initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-8 h-8 text-primary-foreground" /> : <MessageCircle className="w-8 h-8 text-primary-foreground" />}
          </motion.div>
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed md:bottom-24 bottom-24 md:right-5 right-4 z-50 md:w-[370px] w-[calc(100vw-2rem)] md:h-[600px] h-[70vh] md:max-h-[calc(100vh-8rem)] max-h-[70vh] bg-background border border-border/60 rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              <header className="flex items-center justify-between p-4 border-b border-border/60 bg-background shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold rounded-full bg-primary text-primary-foreground">RL</div>
                    <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 rounded-full border-background" />
                  </div>
                  <div>
                    <h3 className="font-bold text-md text-foreground">{t("chat-bot.ai-name")}</h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full cursor-pointer">
                  <X className="w-5 h-5 text-muted-foreground" /><span className="sr-only">{t("time-machine.button")}</span>
                </Button>
              </header>

              <main className="flex-1 p-4 overflow-hidden bg-muted/20">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {messages.map((message) =>
                      message.role === 'assistant' ? (
                        <div key={message.id} className="flex items-end gap-2">
                          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full shrink-0 bg-primary text-primary-foreground">RL</div>
                          <div className="px-4 py-2 rounded-lg bg-background text-foreground max-w-[80%] rounded-bl-none">
                            <div className="text-sm prose prose-invert max-w-none"> {/* Mova o className para este div wrapper */}
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                                components={{
                                  code: ({ className, children, ...props }: CodeProps) => (
                                    <code className={`${className || ''} bg-muted p-1 rounded`} {...props}>
                                      {children}
                                    </code>
                                  ),
                                  table: ({ children, ...props }: TableProps) => (
                                    <table className="border border-collapse border-border" {...props}>
                                      {children}
                                    </table>
                                  ),
                                  th: ({ children, ...props }: TableCellProps) => (
                                    <th className="px-2 py-1 border border-border bg-muted" {...props}>
                                      {children}
                                    </th>
                                  ),
                                  td: ({ children, ...props }: TableCellProps) => (
                                    <td className="px-2 py-1 border border-border" {...props}>
                                      {children}
                                    </td>
                                  ),
                                }}
                              >
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={message.id} className="flex items-end justify-end gap-2">
                          <div className="px-4 py-2 text-white rounded-lg bg-primary max-w-[80%] rounded-br-none">
                            <p className="text-sm">{message.text}</p>
                          </div>
                        </div>
                      )
                    )}
                    {isLoading && (
                      <div className="flex items-end gap-2">
                        <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-full shrink-0 bg-primary text-primary-foreground">RL</div>
                        <div className="px-4 py-2 rounded-lg rounded-bl-none bg-background text-foreground">
                          <div className="flex items-center justify-center gap-1.5 h-5">
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0s' }}></span>
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </main>

              <footer className="p-3 border-t border-border/60 bg-background">
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={t("chat-bot.placeholder")} className="w-full py-2 pl-4 pr-12 text-sm border rounded-full bg-muted border-border focus:outline-none focus:ring-2 focus:ring-primary/50" disabled={isLoading} />
                  <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-white transition-colors rounded-full cursor-pointer bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50" aria-label="Enviar mensagem" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
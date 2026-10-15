/* ---------- Demo do início: pergunta fraca x pergunta com método ---------- */
var demo = [
    '<span class="tag b">Prompt fraco</span><q>Me ensina Biologia dos órgãos sexuais masculinos e femininos.</q><p>Resultado: resposta genérica e rasa.</p>',
    '<span class="tag g">Prompt com método</span><q>Explique Equação de 1º grau para o 1º ano do Ensino Médio, passo a passo e com linguagem simples. Depois, dê 5 exercícios do fácil ao difícil.</q><p>Resultado: assunto, nível e formato definidos.</p>'
];

var d = document.getElementById('demo');
d.innerHTML = demo[0];

document.querySelectorAll('.toggle button').forEach(function (b) {
    b.onclick = function () {
        document.querySelectorAll('.toggle button').forEach(function (x) {
            x.setAttribute('aria-pressed', x === b);
        });
        d.innerHTML = demo[b.dataset.k];
    };
});

/* ---------- Abas: IA por área + como estudar melhor ----------
   n = nome da aba | d = descrição da área
   a = ferramentas [ [ [nome, link], ... ], descrição ]
   i = introdução de "como estudar melhor" | p = prompts de exemplo        */
var areas = [
    {
        n: 'Matemática',
        d: 'Matemática e suas Tecnologias: Matemática.',
        a: [
            [[['Photomath', 'https://photomath.com']], 'Ideal para ver o passo a passo da resolução de contas e equações.'],
            [[['WolframAlpha', 'https://www.wolframalpha.com']], 'Ótimo para verificar cálculos complexos e gerar gráficos de funções.']
        ],
        i: 'Em Matemática, o segredo é praticar, errar e entender onde se errou. Ver a solução pronta dá a falsa sensação de aprendizado. Por isso, peça dicas progressivas:',
        p: [
            'Não resolva esta questão de porcentagem. Dê apenas a primeira dica, e se eu travar, dê outra um pouco mais direta.',
            'Resolvi assim: [sua resolução]. Em que passo errei?',
            'Explique de onde vem a fórmula de Bhaskara.',
            'Crie 5 exercícios de porcentagem, do fácil ao difícil, um por vez.'
        ]
    },
    {
        n: 'Humanas',
        d: 'Ciências Humanas e Sociais Aplicadas: História, Geografia, Filosofia e Sociologia.',
        a: [
            [[['Perplexity AI', 'https://www.perplexity.ai']], 'Traz conteúdos atualizados com fontes e referências confiáveis, perfeito para História e Geografia.'],
            [[['Claude', 'https://claude.ai']], 'Excelente para criar linhas do tempo, comparar correntes de pensamento (Filosofia/Sociologia) e montar argumentos para redação.']
        ],
        i: 'Em Ciências Humanas, o desafio é compreender contextos, causas e consequências, e não decorar datas soltas. Nessa área, a IA ajuda a organizar as relações entre os acontecimentos. Um bom pedido seria:',
        p: [
            'Explique as causas e as consequências da Revolução Industrial e monte uma linha do tempo com os seis eventos mais importantes, dizendo como cada um levou ao próximo.',
            'Explique as causas da Revolução Francesa em 5 tópicos curtos.',
            'Compare Platão e Aristóteles em uma tabela simples.',
            'Faça 3 perguntas sobre este texto, uma de cada vez, sem dar a resposta.',
            'Relacione o tema urbanização com um problema atual do Brasil.'
        ]
    },
    {
        n: 'Linguagens',
        d: 'Linguagens e suas Tecnologias: Português, Literatura, Inglês, Artes e Educação Física (Espanhol pode ser optativo).',
        a: [
            [[['Claude', 'https://claude.ai']], 'Melhor para interpretação de textos, análise de obras literárias e produção de redação.'],
            [[['DeepL', 'https://www.deepl.com']], 'Mais preciso para tradução e correção de textos em Inglês e Espanhol.']
        ],
        i: 'Em Linguagens, o objetivo é interpretar, escrever e se expressar com clareza. Para interpretação, cole um texto e peça perguntas. Para gramática, aprender com exemplos ajuda mais do que decorar regras:',
        p: [
            'Faça cinco perguntas sobre este texto, uma por vez, e depois explique onde acertei ou errei na leitura.',
            "Explique a diferença entre 'mau' e 'mal' e crie cinco frases para eu completar.",
            'Avalie a minha redação nas 5 competências do ENEM, sem reescrever.',
            'Converse comigo em inglês e corrija meus erros no final.'
        ]
    },
    {
        n: 'Natureza',
        d: 'Ciências da Natureza e suas Tecnologias: Biologia, Física e Química.',
        a: [
            [[['Claude', 'https://claude.ai'], ['ChatGPT', 'https://chatgpt.com']], 'Ótimos para explicar conceitos de Biologia, Química e Física de forma simples, com exemplos e exercícios práticos.']
        ],
        i: 'Em Ciências da Natureza e suas Tecnologias, o foco está em entender processos e fenômenos e relacioná-los ao cotidiano. Também vale treinar com questões no estilo do exame:',
        p: [
            'Crie uma questão de ecologia com texto-base, cinco alternativas e gabarito comentado, e só mostre o gabarito depois que eu responder.',
            'Explique a fotossíntese usando uma analogia do dia a dia.',
            'Qual fórmula uso neste problema de velocidade média? Não faça a conta, só me diga por quê.',
            'Faça 5 perguntas sobre respiração celular, uma por vez.'
        ]
    }
];

var t = document.getElementById('tabs'),
    p = document.getElementById('panel');

/* Monta o botão verde com link(s) clicável(is) para o site de cada IA */
function toolLinks(links) {
    return links.map(function (l) {
        return '<a href="' + l[1] + '" target="_blank" rel="noopener noreferrer" ' +
            'style="color:inherit;text-decoration:none" title="Abrir ' + l[0] + '">' +
            l[0] + ' ↗</a>';
    }).join(' / ');
}

function show(i) {
    [].forEach.call(t.children, function (b, j) {
        b.setAttribute('aria-selected', i === j);
    });
    var a = areas[i];
    p.innerHTML =
        '<p><b>' + a.d + '</b></p>' +
        a.a.map(function (x) {
            return '<div class="ai"><b>' + toolLinks(x[0]) + '</b><span>' + x[1] + '</span></div>';
        }).join('') +
        '<h3 style="margin-top:24px">Como estudar melhor</h3>' +
        '<p>' + a.i + '</p>' +
        a.p.map(function (x) {
            return '<q>' + x + '</q>';
        }).join('');
}

areas.forEach(function (a, i) {
    var b = document.createElement('button');
    b.textContent = a.n;
    b.setAttribute('role', 'tab');
    b.onclick = function () { show(i); };
    t.appendChild(b);
});
show(0);

/* ---------- Barras do mercado: animam ao aparecer e ao clicar ---------- */
var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.fill').forEach(function (f) {
                f.classList.add('on');
            });
        }
    });
}, { threshold: .3 });

document.querySelectorAll('#mercado .card').forEach(function (c) {
    io.observe(c);
});

document.querySelectorAll('#mercado .card').forEach(function (c) {
    c.onclick = function () {
        c.querySelectorAll('.fill').forEach(function (f) {
            f.classList.remove('on');
            void f.offsetWidth;
            f.classList.add('on');
        });
    };
});

/* ---------- Prompts modelo: botão "Copiar prompt" ---------- */
document.querySelectorAll('.copy').forEach(function (b) {
    b.onclick = function () {
        var txt = document.getElementById(b.dataset.t).innerText;
        navigator.clipboard.writeText(txt).then(function () {
            b.textContent = 'Copiado!';
            setTimeout(function () { b.textContent = 'Copiar prompt'; }, 1500);
        });
    };
});

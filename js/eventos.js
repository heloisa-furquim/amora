/*
 * EVENTOS DE EXEMPLO
 * Troque estes dados pelos encontros reais do Clube Aflora.
 *
 * Campos:
 *   id              identificador único, só letras minúsculas, números e hífen (vai na URL)
 *   titulo          nome do encontro
 *   categoria       aparece como etiqueta e na capa
 *   data            "AAAA-MM-DD"
 *   inicio / fim    "HH:MM"
 *   local           nome do lugar
 *   endereco        bairro, cidade ou "enviado por e-mail"
 *   preco           valor de 1 ingresso, em reais (número)
 *   vagasTotais     capacidade da turma
 *   vagasRestantes  quantas ainda estão à venda (0 = esgotado)
 *   descricao       um ou mais parágrafos (array de textos)
 *   inclui          lista do que está incluso
 *   imagem          (opcional) caminho de uma foto de capa
 *   cor             (opcional) "lilas", "creme", "rosa" ou "vinho": cor da capa sem foto
 */
window.AFLORA_EVENTOS = [
  {
    id: "ceramica-maos-no-barro",
    titulo: "Oficina de cerâmica: mãos no barro",
    categoria: "Cerâmica",
    data: "2026-11-28",
    inicio: "14:00",
    fim: "17:00",
    local: "Ateliê Terra Crua",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 180,
    vagasTotais: 12,
    vagasRestantes: 3,
    descricao: [
      "Uma tarde para desligar o celular e sujar as mãos. Você aprende a modelar uma caneca e um pratinho com as técnicas de beliscão e placa, do zero.",
      "Não precisa ter experiência. As peças passam pela queima no ateliê e ficam prontas para retirar em cerca de 30 dias."
    ],
    inclui: ["Argila e ferramentas", "Avental", "Queima das peças", "Café e bolo"],
    imagem: "assets/ceramica.jpg"
  },
  {
    id: "cinema-e-conversa-dez",
    titulo: "Cinema e conversa",
    categoria: "Cultura",
    data: "2026-12-03",
    inicio: "19:30",
    fim: "22:00",
    local: "Sala Lumière",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 45,
    vagasTotais: 30,
    vagasRestantes: 22,
    descricao: [
      "A gente assiste junto a um filme escolhido pelo clube e depois conversa sobre ele com pipoca e vinho.",
      "O título é revelado uma semana antes, no nosso Instagram."
    ],
    inclui: ["Sessão do filme", "Pipoca", "Uma taça de vinho ou suco"],
    cor: "vinho"
  },
  {
    id: "piquenique-literario",
    titulo: "Piquenique literário",
    categoria: "Leitura",
    data: "2026-12-05",
    inicio: "10:00",
    fim: "13:00",
    local: "Parque da cidade",
    endereco: "Ponto de encontro enviado por e-mail",
    preco: 65,
    vagasTotais: 25,
    vagasRestantes: 14,
    descricao: [
      "Traga um livro que você ama e saia com um livro novo. Fazemos uma troca às cegas e uma roda de leitura na grama.",
      "Em caso de chuva, o encontro muda para um café parceiro e avisamos todo mundo com antecedência."
    ],
    inclui: ["Toalha e almofadas", "Cesta de piquenique", "Marcador de páginas do clube"],
    cor: "creme"
  },
  {
    id: "aquarela-botanica",
    titulo: "Aquarela botânica",
    categoria: "Pintura",
    data: "2026-12-06",
    inicio: "15:00",
    fim: "18:00",
    local: "Estúdio Folha",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 140,
    vagasTotais: 15,
    vagasRestantes: 9,
    descricao: [
      "Pintamos folhas e flores de observação, começando pelas misturas de cor e pelo controle da água no papel.",
      "Você leva para casa duas pinturas e um caderninho com as paletas que criou."
    ],
    inclui: ["Tintas, pincéis e papel 300 g", "Caderninho de paletas", "Chá da tarde"],
    cor: "lilas"
  },
  {
    id: "bordado-livre-iniciantes",
    titulo: "Bordado livre para iniciantes",
    categoria: "Bordado",
    data: "2026-12-10",
    inicio: "19:00",
    fim: "21:30",
    local: "Ateliê Linha Solta",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 120,
    vagasTotais: 12,
    vagasRestantes: 7,
    descricao: [
      "Seis pontos básicos para você bordar um bastidor floral do começo ao fim.",
      "O kit é seu: dá para continuar bordando em casa no mesmo dia."
    ],
    inclui: ["Kit com bastidor, linhas e agulhas", "Risco do desenho", "Petiscos"],
    cor: "rosa"
  },
  {
    id: "cafe-e-croche",
    titulo: "Café da manhã com crochê",
    categoria: "Crochê",
    data: "2026-12-12",
    inicio: "09:30",
    fim: "12:00",
    local: "Café Miúda",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 90,
    vagasTotais: 16,
    vagasRestantes: 10,
    descricao: [
      "Aprenda a correntinha, o ponto baixo e o ponto alto enquanto toma um café da manhã caprichado.",
      "No fim você terá um porta-copos pronto e o começo de um projeto para levar."
    ],
    inclui: ["Café da manhã", "Agulha e novelo", "Receita impressa"],
    cor: "creme"
  },
  {
    id: "vinhos-naturais",
    titulo: "Degustação de vinhos naturais",
    categoria: "Gastronomia",
    data: "2026-12-12",
    inicio: "18:00",
    fim: "20:30",
    local: "Adega Raiz",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 210,
    vagasTotais: 18,
    vagasRestantes: 0,
    descricao: [
      "Cinco rótulos de pequenos produtores, harmonizados com queijos e pães, com uma sommelière explicando cada taça.",
      "Evento para maiores de 18 anos."
    ],
    inclui: ["5 taças de degustação", "Tábua de queijos", "Guia de rótulos"],
    cor: "vinho"
  },
  {
    id: "guirlanda-flores-secas",
    titulo: "Guirlanda de Natal com flores secas",
    categoria: "Flores",
    data: "2026-12-13",
    inicio: "14:00",
    fim: "16:30",
    local: "Floricultura Campo Aberto",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 150,
    vagasTotais: 14,
    vagasRestantes: 5,
    descricao: [
      "Montamos uma guirlanda com flores secas, ramos e fitas para enfeitar a sua porta neste fim de ano.",
      "Cada participante escolhe a própria paleta de cores entre os materiais da mesa."
    ],
    inclui: ["Base de guirlanda", "Flores secas e fitas", "Espumante"],
    cor: "rosa"
  },
  {
    id: "ceramica-turma-2",
    titulo: "Oficina de cerâmica: turma 2",
    categoria: "Cerâmica",
    data: "2026-12-19",
    inicio: "14:00",
    fim: "17:00",
    local: "Ateliê Terra Crua",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 180,
    vagasTotais: 12,
    vagasRestantes: 12,
    descricao: [
      "Segunda turma da oficina de modelagem. Mesmo conteúdo da primeira, para quem não conseguiu vaga.",
      "Não precisa ter experiência. As peças ficam prontas para retirar em cerca de 30 dias."
    ],
    inclui: ["Argila e ferramentas", "Avental", "Queima das peças", "Café e bolo"],
    imagem: "assets/ceramica.jpg"
  },
  {
    id: "yoga-ao-ar-livre",
    titulo: "Yoga ao ar livre",
    categoria: "Bem-estar",
    data: "2027-01-10",
    inicio: "08:00",
    fim: "09:30",
    local: "Parque da cidade",
    endereco: "Ponto de encontro enviado por e-mail",
    preco: 55,
    vagasTotais: 30,
    vagasRestantes: 30,
    descricao: [
      "Uma prática leve para começar o ano, aberta a todos os níveis, seguida de frutas e água de coco.",
      "Leve seu tapete se tiver. Temos alguns para emprestar."
    ],
    inclui: ["Aula de 60 minutos", "Lanche com frutas"],
    cor: "lilas"
  },
  {
    id: "pintura-em-tecido",
    titulo: "Pintura em tecido",
    categoria: "Pintura",
    data: "2027-01-17",
    inicio: "15:00",
    fim: "18:00",
    local: "Estúdio Folha",
    endereco: "Endereço enviado por e-mail após a compra",
    preco: 130,
    vagasTotais: 15,
    vagasRestantes: 15,
    descricao: [
      "Customize uma ecobag com tinta para tecido, carimbos e estêncil.",
      "A tinta é fixada com ferro no próprio encontro, então a bolsa já sai pronta para usar."
    ],
    inclui: ["Ecobag de algodão", "Tintas e carimbos", "Chá da tarde"],
    cor: "creme"
  }
];

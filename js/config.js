/*
 * CONFIGURAÇÃO DO SITE
 *
 * checkoutUrl: endereço do seu checkout externo.
 *   Vazio = o botão abre uma janela de pré-visualização com os dados que seriam enviados.
 *   Preenchido = o site leva a pessoa para:
 *     <checkoutUrl>?evento=<id>&quantidade=<n>&titulo=...&data=...&horario=...&preco_unitario=...&total=...
 *
 *   IMPORTANTE: qualquer pessoa pode editar os parâmetros de uma URL.
 *   O checkout deve cobrar usando só "evento" e "quantidade" e buscar o preço
 *   na própria base. Os outros campos servem apenas para exibição.
 *
 * evento: os dados do workshop.
 *   preco: deixe null enquanto o valor não estiver definido. A página mostra
 *          "Valor em breve" e o botão de pagamento fica desativado.
 *   fim:   deixe "" se não houver horário de término definido.
 *   ATENÇÃO: o número de vagas abaixo é PROVISÓRIO.
 */
window.AFLORA_CONFIG = {
  checkoutUrl: "",
  maxIngressosPorPedido: 6,
  instagram: "https://www.instagram.com/clube.aflora/",

  evento: {
    id: "ecobag-e-drinks",
    tipo: "Workshop",
    titulo: "Pintura de ecobag & drinks",
    resumo: "Pinte a sua ecobag com uma caipirinha de vinho na mão. Não precisa saber pintar.",
    data: "2026-12-17",          // AAAA-MM-DD
    inicio: "19:00",
    fim: "",                     // ex.: "22:00"
    local: "Alambique do Lu, Pedra Bela",
    preco: null,                 // valor de 1 ingresso, em reais (ex.: 150). null = em breve
    vagasRestantes: 20,          // 0 = esgotado
    inclui: ["Ecobag", "Tintas e pincéis", "Caipirinha de vinho de brinde"]
  }
};

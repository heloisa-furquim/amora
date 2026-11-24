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
 *   ATENÇÃO: data, horário, local, preço e vagas abaixo são PROVISÓRIOS. Troque pelos reais.
 */
window.AFLORA_CONFIG = {
  checkoutUrl: "",
  maxIngressosPorPedido: 6,
  instagram: "https://www.instagram.com/clube.aflora/",

  evento: {
    id: "ecobag-e-drinks",
    tipo: "Workshop",
    titulo: "Pintura de ecobag & drinks",
    resumo: "Pinte a sua ecobag enquanto toma um drink. Não precisa saber pintar.",
    data: "2026-12-12",          // AAAA-MM-DD
    inicio: "15:00",
    fim: "18:00",
    local: "Endereço enviado por e-mail",
    preco: 150,                  // valor de 1 ingresso, em reais
    vagasRestantes: 20,          // 0 = esgotado
    inclui: ["Ecobag", "Tintas e pincéis", "2 drinks"]
  }
};

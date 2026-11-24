/*
 * CONFIGURAÇÃO DO SITE
 *
 * checkoutUrl: endereço do seu checkout externo.
 *   Enquanto estiver vazio, o botão de pagamento abre uma janela de
 *   pré-visualização mostrando os dados que seriam enviados.
 *
 *   Quando preenchido, o site leva a pessoa para:
 *     <checkoutUrl>?evento=<id>&quantidade=<n>&titulo=...&data=...&horario=...&preco_unitario=...&total=...
 *
 *   IMPORTANTE: qualquer pessoa pode editar os parâmetros de uma URL.
 *   O checkout deve usar só "evento" e "quantidade" para cobrar, buscando o
 *   preço e as vagas na sua própria base. Os outros campos servem apenas
 *   para exibição.
 *
 * maxIngressosPorPedido: limite de ingressos em uma compra.
 */
window.AFLORA_CONFIG = {
  checkoutUrl: "",
  maxIngressosPorPedido: 6,
  instagram: "https://www.instagram.com/clube.aflora/"
};

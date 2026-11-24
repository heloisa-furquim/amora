(function () {
  "use strict";

  var CFG = window.AFLORA_CONFIG || {};
  var ev = CFG.evento;
  var MAX = Math.max(0, Math.min(ev.vagasRestantes, CFG.maxIngressosPorPedido || 6));

  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
    "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  var $ = function (id) { return document.getElementById(id); };

  var p = ev.data.split("-").map(Number);
  var data = new Date(p[0], p[1] - 1, p[2]);
  var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  var hora = function (h) { return h.replace(":00", "h").replace(":", "h"); };
  var passado = data < hoje;
  var esgotado = ev.vagasRestantes <= 0;
  var qtd = 1;

  /* Conteúdo vindo do config.js */
  $("ev-tipo").textContent = ev.tipo;
  $("ev-titulo").textContent = ev.titulo;
  $("ev-resumo").textContent = ev.resumo;
  $("ev-quando").textContent = SEMANA[data.getDay()] + ", " + data.getDate() + " de " + MESES[data.getMonth()] +
    " · " + hora(ev.inicio) + " às " + hora(ev.fim);
  $("ev-local").textContent = ev.local;
  $("capa-data").textContent = data.getDate() + " " + MESES[data.getMonth()].slice(0, 3);
  $("ev-inclui").innerHTML = (ev.inclui || []).map(function (i) {
    return '<li><i class="flor" aria-hidden="true"></i>' + String(i).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    }) + "</li>";
  }).join("");
  document.title = ev.titulo + " · Clube Aflora";
  if (CFG.instagram) $("link-insta").href = CFG.instagram;

  /* Quantidade e total */
  var menos = $("qtd-menos"), mais = $("qtd-mais"), pagar = $("btn-pagar");

  function dados() {
    return [
      ["evento", ev.id],
      ["quantidade", String(qtd)],
      ["titulo", ev.titulo],
      ["data", ev.data],
      ["horario", ev.inicio],
      ["preco_unitario", ev.preco.toFixed(2)],
      ["total", (ev.preco * qtd).toFixed(2)]
    ];
  }

  function atualizar() {
    $("qtd-valor").textContent = qtd;
    menos.disabled = qtd <= 1;
    mais.disabled = qtd >= MAX;
    $("barra-qtd").textContent = qtd + (qtd > 1 ? " ingressos" : " ingresso");
    $("barra-valor").textContent = brl.format(ev.preco * qtd);

    if (CFG.checkoutUrl) {
      var u = new URL(CFG.checkoutUrl, location.href);
      dados().forEach(function (d) { u.searchParams.set(d[0], d[1]); });
      pagar.href = u.toString();
    }
  }

  if (passado || esgotado) {
    $("compra").hidden = true;
    $("barra-qtd").textContent = passado ? "Encontro encerrado" : "Sem vagas";
    $("barra-valor").textContent = brl.format(ev.preco);
    pagar.textContent = passado ? "Encerrado" : "Esgotado";
    pagar.setAttribute("aria-disabled", "true");
    pagar.removeAttribute("href");
  } else {
    $("compra-ajuda").textContent = brl.format(ev.preco) + " cada" +
      (ev.vagasRestantes <= 5 ? " · restam " + ev.vagasRestantes : "");
    menos.addEventListener("click", function () { qtd = Math.max(1, qtd - 1); atualizar(); });
    mais.addEventListener("click", function () { qtd = Math.min(MAX, qtd + 1); atualizar(); });
    atualizar();
  }

  /* Pagamento: segue para o checkout externo ou mostra a pré-visualização */
  var folha = $("folha");
  pagar.addEventListener("click", function (e) {
    if (pagar.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
    if (CFG.checkoutUrl) return;
    e.preventDefault();
    $("folha-dados").innerHTML = dados().map(function (d) {
      return "<div><dt>" + d[0] + "</dt><dd></dd></div>";
    }).join("");
    var dds = $("folha-dados").querySelectorAll("dd");
    dados().forEach(function (d, i) { dds[i].textContent = d[1]; });
    folha.hidden = false;
    $("folha-fechar").focus();
  });
  function fechar() { folha.hidden = true; pagar.focus(); }
  $("folha-fechar").addEventListener("click", fechar);
  folha.addEventListener("click", function (e) { if (e.target === folha) fechar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !folha.hidden) fechar(); });
})();

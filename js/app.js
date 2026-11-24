(function () {
  "use strict";

  var CFG = window.AFLORA_CONFIG || {};
  var MAX_POR_PEDIDO = CFG.maxIngressosPorPedido || 6;
  var EVENTOS = (window.AFLORA_EVENTOS || []).slice().sort(function (a, b) {
    return (a.data + a.inicio).localeCompare(b.data + b.inicio);
  });

  var MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
    "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var SEM_CURTA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  var SEM_LONGA = ["domingo", "segunda-feira", "terça-feira", "quarta-feira",
    "quinta-feira", "sexta-feira", "sábado"];
  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  var $ = function (id) { return document.getElementById(id); };
  var el = {
    topo: document.querySelector(".topo"),
    agenda: $("view-agenda"),
    evento: $("view-evento"),
    mes: $("cal-mes"),
    ant: $("cal-ant"),
    prox: $("cal-prox"),
    dias: $("cal-dias"),
    listaTitulo: $("lista-titulo"),
    listaConta: $("lista-conta"),
    filtro: $("filtro"),
    filtroTexto: $("filtro-texto"),
    filtroLimpar: $("filtro-limpar"),
    cards: $("cards"),
    barra: $("barra-compra"),
    barraQtd: $("barra-qtd"),
    barraValor: $("barra-valor"),
    pagar: $("btn-pagar"),
    folha: $("folha"),
    folhaDados: $("folha-dados"),
    folhaFechar: $("folha-fechar")
  };

  /* ---------- Datas ---------- */
  function parseData(s) {
    var p = s.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function hora(h) { return h.replace(":00", "h").replace(":", "h"); }
  function dataLonga(d) { return SEM_LONGA[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()]; }
  function duracao(ev) {
    var a = ev.inicio.split(":").map(Number), b = ev.fim.split(":").map(Number);
    var min = (b[0] * 60 + b[1]) - (a[0] * 60 + a[1]);
    var h = Math.floor(min / 60), m = min % 60;
    return (h ? h + "h" : "") + (m ? (h ? String(m).padStart(2, "0") : m + " min") : "");
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  var hojeIso = iso(hoje);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function futuros() { return EVENTOS.filter(function (e) { return e.data >= hojeIso; }); }
  function porDia(dIso) { return EVENTOS.filter(function (e) { return e.data === dIso; }); }
  function porMes(ano, mes) {
    var pref = ano + "-" + String(mes + 1).padStart(2, "0");
    return futuros().filter(function (e) { return e.data.indexOf(pref) === 0; });
  }

  /* ---------- Estado ---------- */
  var proximo = futuros()[0];
  var inicio = proximo ? parseData(proximo.data) : hoje;
  // Abre no mês atual se ele ainda tiver encontros; senão, no mês do próximo encontro.
  var base = porMes(hoje.getFullYear(), hoje.getMonth()).length ? hoje : inicio;
  var estado = { ano: base.getFullYear(), mes: base.getMonth(), dia: null, qtd: 1, rolagem: 0 };
  var ultimo = EVENTOS.length ? parseData(EVENTOS[EVENTOS.length - 1].data) : hoje;

  /* ---------- Calendário ---------- */
  function renderCalendario() {
    var ano = estado.ano, mes = estado.mes;
    el.mes.innerHTML = cap(MESES[mes]) + " <span>" + ano + "</span>";
    el.ant.disabled = ano < hoje.getFullYear() || (ano === hoje.getFullYear() && mes <= hoje.getMonth());
    el.prox.disabled = ano > ultimo.getFullYear() || (ano === ultimo.getFullYear() && mes >= ultimo.getMonth());

    var primeiro = new Date(ano, mes, 1).getDay();
    var total = new Date(ano, mes + 1, 0).getDate();
    var html = "";
    for (var i = 0; i < primeiro; i++) html += '<span aria-hidden="true"></span>';
    for (var d = 1; d <= total; d++) {
      var data = new Date(ano, mes, d);
      var dIso = iso(data);
      var evs = dIso >= hojeIso ? porDia(dIso) : [];
      var classes = "dia";
      if (dIso === hojeIso) classes += " dia-hoje";
      if (evs.length) {
        if (evs.length > 1) classes += " dia-varios";
        var rotulo = dataLonga(data) + ", " + evs.length + (evs.length > 1 ? " encontros" : " encontro");
        html += '<button type="button" class="' + classes + '" data-dia="' + dIso + '" data-qtd="' + evs.length +
          '" aria-pressed="' + (estado.dia === dIso) + '" aria-label="' + esc(rotulo) + '"><span>' + d + "</span></button>";
      } else {
        classes += dIso < hojeIso ? " dia-passado" : " dia-vazio";
        html += '<span class="' + classes + '"><span>' + d + "</span></span>";
      }
    }
    el.dias.innerHTML = html;
  }

  /* ---------- Lista ---------- */
  function statusVagas(ev) {
    if (ev.vagasRestantes <= 0) return '<span class="chip chip-esgotado">Esgotado</span>';
    if (ev.vagasRestantes <= 5) {
      return '<span class="chip chip-ultimas">' + (ev.vagasRestantes === 1 ? "Última vaga" : "Últimas " + ev.vagasRestantes + " vagas") + "</span>";
    }
    return '<span class="chip">' + ev.vagasRestantes + " vagas</span>";
  }

  function selo(d) {
    return '<span class="selo" aria-hidden="true"><span class="selo-dia">' + d.getDate() +
      '</span><span class="selo-sem">' + SEM_CURTA[d.getDay()] + "</span></span>";
  }

  function card(ev) {
    var d = parseData(ev.data);
    return '<a class="card' + (ev.vagasRestantes <= 0 ? " card-esgotado" : "") + '" href="#evento-' + esc(ev.id) + '">' +
      selo(d) +
      '<div class="card-corpo">' +
      '<span class="etiqueta">' + esc(ev.categoria) + "</span>" +
      '<h3 class="card-titulo">' + esc(ev.titulo) + "</h3>" +
      '<p class="card-meta">' + cap(dataLonga(d)) + " · " + hora(ev.inicio) + " · " + esc(ev.local) + "</p>" +
      '<span class="card-rodape"><span class="preco">' + brl.format(ev.preco) + "</span>" + statusVagas(ev) + "</span>" +
      "</div></a>";
  }

  function renderLista() {
    var evs = estado.dia ? porDia(estado.dia) : porMes(estado.ano, estado.mes);
    el.listaTitulo.textContent = "Agenda de " + MESES[estado.mes];
    el.listaConta.textContent = evs.length ? evs.length + (evs.length > 1 ? " encontros" : " encontro") : "";

    if (estado.dia) {
      el.filtro.hidden = false;
      el.filtroTexto.textContent = cap(dataLonga(parseData(estado.dia)));
    } else {
      el.filtro.hidden = true;
    }

    if (!evs.length) {
      el.cards.innerHTML = '<div class="vazio"><i class="flor" aria-hidden="true"></i>' +
        "<strong>Nenhum encontro em " + MESES[estado.mes] + " por enquanto</strong>" +
        "<p>As próximas datas são anunciadas primeiro no Instagram do clube.</p></div>";
      return;
    }
    el.cards.innerHTML = evs.map(card).join("");
  }

  function renderAgenda() { renderCalendario(); renderLista(); }

  el.ant.addEventListener("click", function () {
    estado.mes--; if (estado.mes < 0) { estado.mes = 11; estado.ano--; }
    estado.dia = null; renderAgenda();
  });
  el.prox.addEventListener("click", function () {
    estado.mes++; if (estado.mes > 11) { estado.mes = 0; estado.ano++; }
    estado.dia = null; renderAgenda();
  });
  el.dias.addEventListener("click", function (e) {
    var b = e.target.closest("button.dia");
    if (!b) return;
    estado.dia = estado.dia === b.dataset.dia ? null : b.dataset.dia;
    renderAgenda();
    // No celular, leva a pessoa até a lista depois de escolher o dia.
    if (estado.dia && window.matchMedia("(max-width: 879px)").matches) {
      var alvo = $("lista-titulo").getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top: alvo, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  });
  el.filtroLimpar.addEventListener("click", function () { estado.dia = null; renderAgenda(); });

  /* ---------- Página do evento ---------- */
  var atual = null;

  function capa(ev) {
    var d = parseData(ev.data);
    var seloHtml = '<span class="capa-selo">' + selo(d) + "</span>";
    if (ev.imagem) {
      return '<div class="capa"><img src="' + esc(ev.imagem) + '" alt="" loading="eager">' + seloHtml + "</div>";
    }
    return '<div class="capa capa-desenho cor-' + esc(ev.cor || "lilas") + '">' +
      '<span class="capa-flor"><span>' + esc(ev.categoria) + "</span></span>" + seloHtml + "</div>";
  }

  function renderEvento(ev) {
    atual = ev;
    var d = parseData(ev.data);
    var passado = ev.data < hojeIso;
    var esgotado = ev.vagasRestantes <= 0;
    var max = Math.min(ev.vagasRestantes, MAX_POR_PEDIDO);
    estado.qtd = Math.max(1, Math.min(estado.qtd, max || 1));

    var compra;
    if (passado) {
      compra = '<div class="compra"><p class="compra-rotulo">Este encontro já aconteceu</p>' +
        '<p class="compra-aviso">Veja as próximas datas na agenda.</p></div>';
    } else if (esgotado) {
      compra = '<div class="compra"><p class="compra-rotulo">Ingressos esgotados</p>' +
        '<p class="compra-aviso">Siga o clube no Instagram para saber quando abrir uma nova turma.</p></div>';
    } else {
      compra = '<div class="compra">' +
        '<div class="compra-linha"><div><p class="compra-rotulo" id="qtd-rotulo">Quantos ingressos?</p>' +
        '<p class="compra-ajuda">' + brl.format(ev.preco) + " cada · até " + max + " por pedido</p></div>" +
        '<div class="passo" role="group" aria-labelledby="qtd-rotulo">' +
        '<button type="button" id="qtd-menos" aria-label="Diminuir quantidade">−</button>' +
        '<output id="qtd-valor" aria-live="polite">' + estado.qtd + "</output>" +
        '<button type="button" id="qtd-mais" aria-label="Aumentar quantidade">+</button>' +
        "</div></div>" +
        (ev.vagasRestantes <= 5 ? '<p class="compra-aviso">Restam só ' + ev.vagasRestantes + (ev.vagasRestantes === 1 ? " vaga" : " vagas") + " nesta turma.</p>" : "") +
        "</div>";
    }

    el.evento.innerHTML =
      '<div class="evento-topo"><div class="wrap">' +
      '<a class="voltar" href="#agenda"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Agenda</a>' +
      '<img class="marca-logo" src="assets/logo.png" alt="Clube Aflora" width="40" height="40">' +
      "</div></div>" +
      '<article class="wrap">' +
      capa(ev) +
      '<div class="evento-cabeca"><span class="etiqueta">' + esc(ev.categoria) + "</span>" +
      '<h1 class="evento-titulo" tabindex="-1" id="evento-titulo">' + esc(ev.titulo) + "</h1></div>" +
      '<dl class="info">' +
      "<div><dt>Quando</dt><dd>" + cap(dataLonga(d)) + " de " + d.getFullYear() + "</dd></div>" +
      "<div><dt>Horário</dt><dd>" + hora(ev.inicio) + " às " + hora(ev.fim) + "<small>" + duracao(ev) + " de duração</small></dd></div>" +
      "<div><dt>Onde</dt><dd>" + esc(ev.local) + "<small>" + esc(ev.endereco) + "</small></dd></div>" +
      "<div><dt>Valor</dt><dd>" + brl.format(ev.preco) + "<small>por pessoa</small></dd></div>" +
      "</dl>" +
      '<section class="evento-secao"><h2>Sobre o encontro</h2>' +
      ev.descricao.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>" +
      (ev.inclui && ev.inclui.length ? '<section class="evento-secao"><h2>O que está incluso</h2><ul class="inclui">' +
        ev.inclui.map(function (i) { return '<li><i class="flor" aria-hidden="true"></i>' + esc(i) + "</li>"; }).join("") +
        "</ul></section>" : "") +
      compra +
      "</article>";

    var menos = $("qtd-menos"), mais = $("qtd-mais");
    if (menos) {
      menos.addEventListener("click", function () { mudarQtd(-1, max); });
      mais.addEventListener("click", function () { mudarQtd(1, max); });
    }
    atualizarBarra(passado || esgotado, max);
  }

  function mudarQtd(delta, max) {
    estado.qtd = Math.max(1, Math.min(max, estado.qtd + delta));
    $("qtd-valor").textContent = estado.qtd;
    atualizarBarra(false, max);
  }

  function dadosCheckout(ev) {
    return [
      ["evento", ev.id],
      ["quantidade", String(estado.qtd)],
      ["titulo", ev.titulo],
      ["data", ev.data],
      ["horario", ev.inicio],
      ["preco_unitario", ev.preco.toFixed(2)],
      ["total", (ev.preco * estado.qtd).toFixed(2)]
    ];
  }

  function urlCheckout(ev) {
    if (!CFG.checkoutUrl) return null;
    var u = new URL(CFG.checkoutUrl, location.href);
    dadosCheckout(ev).forEach(function (p) { u.searchParams.set(p[0], p[1]); });
    return u.toString();
  }

  function atualizarBarra(bloqueado, max) {
    var ev = atual;
    var menos = $("qtd-menos"), mais = $("qtd-mais");
    if (menos) { menos.disabled = estado.qtd <= 1; mais.disabled = estado.qtd >= max; }

    if (bloqueado) {
      el.barraQtd.textContent = ev.vagasRestantes <= 0 ? "Sem vagas" : "Encerrado";
      el.barraValor.textContent = brl.format(ev.preco);
      el.pagar.textContent = ev.vagasRestantes <= 0 ? "Esgotado" : "Encerrado";
      el.pagar.setAttribute("aria-disabled", "true");
      el.pagar.removeAttribute("href");
      return;
    }
    el.barraQtd.textContent = estado.qtd + (estado.qtd > 1 ? " ingressos" : " ingresso");
    el.barraValor.textContent = brl.format(ev.preco * estado.qtd);
    el.pagar.textContent = "Ir para o pagamento";
    el.pagar.removeAttribute("aria-disabled");
    el.pagar.setAttribute("href", urlCheckout(ev) || "#");
  }

  el.pagar.addEventListener("click", function (e) {
    if (!atual || el.pagar.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
    if (CFG.checkoutUrl) return; // segue o link para o checkout externo
    e.preventDefault();
    el.folhaDados.innerHTML = dadosCheckout(atual).map(function (p) {
      return "<div><dt>" + p[0] + "</dt><dd>" + esc(p[1]) + "</dd></div>";
    }).join("");
    el.folha.hidden = false;
    el.folhaFechar.focus();
  });
  function fecharFolha() { el.folha.hidden = true; el.pagar.focus(); }
  el.folhaFechar.addEventListener("click", fecharFolha);
  el.folha.addEventListener("click", function (e) { if (e.target === el.folha) fecharFolha(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !el.folha.hidden) fecharFolha(); });

  /* ---------- Rotas (#agenda e #evento-<id>) ---------- */
  var naAgenda = true;
  function rota() {
    var h = location.hash.slice(1);
    var ev = h.indexOf("evento-") === 0 && EVENTOS.find(function (e) { return e.id === h.slice(7); });
    el.folha.hidden = true;

    if (ev) {
      if (naAgenda) estado.rolagem = window.scrollY;
      if (!atual || atual.id !== ev.id) estado.qtd = 1;
      naAgenda = false;
      // Abre o calendário no mês do evento ao voltar.
      var d = parseData(ev.data);
      estado.ano = d.getFullYear(); estado.mes = d.getMonth();
      renderEvento(ev);
      el.topo.hidden = true; el.agenda.hidden = true;
      el.evento.hidden = false; el.barra.hidden = false;
      document.body.classList.add("evento-ativo");
      document.title = ev.titulo + " · Clube Aflora";
      window.scrollTo(0, 0);
      var t = $("evento-titulo"); if (t) t.focus({ preventScroll: true });
      return;
    }

    var vindoDeEvento = !naAgenda;
    naAgenda = true;
    el.evento.hidden = true; el.barra.hidden = true;
    el.topo.hidden = false; el.agenda.hidden = false;
    document.body.classList.remove("evento-ativo");
    document.title = "Clube Aflora";
    renderAgenda();
    if (vindoDeEvento) window.scrollTo(0, estado.rolagem);
  }

  if (CFG.instagram) {
    document.querySelectorAll("a.insta").forEach(function (a) { a.href = CFG.instagram; });
  }
  window.addEventListener("hashchange", rota);
  rota();
})();

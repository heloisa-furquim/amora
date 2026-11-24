# Clube Aflora: ingressos

Página única e mobile-first (HTML, CSS e JavaScript puro, sem back-end) para vender ingressos
do workshop de pintura de ecobag & drinks.

## Estrutura

```
index.html      a página
css/style.css   visual (cores e fontes no topo do arquivo)
js/config.js    dados do evento e endereço do checkout  ← edite aqui
js/app.js       quantidade, total e envio para o checkout
```

Data, horário, local, preço e vagas em `js/config.js` são provisórios.

## Como ver

Abra `index.html` no navegador ou rode `python3 -m http.server 8000`.

## Checkout externo

Com `checkoutUrl` preenchido, o botão leva para:

```
<checkoutUrl>?evento=ecobag-e-drinks&quantidade=2&titulo=...&data=AAAA-MM-DD&horario=HH:MM&preco_unitario=150.00&total=300.00
```

Os parâmetros da URL podem ser alterados por qualquer pessoa. O checkout deve cobrar usando só
`evento` e `quantidade` e buscar o preço na própria base. Os outros campos servem só para exibição.

Enquanto `checkoutUrl` estiver vazio, o botão abre uma janela de pré-visualização com esses dados.

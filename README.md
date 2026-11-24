# Clube Aflora: agenda e ingressos

Site estático e mobile-first (HTML, CSS e JavaScript puro, sem back-end).

- **Calendário:** os dias com encontro aparecem com uma flor. Ao tocar no dia, a lista mostra só aquele dia.
- **Página do evento:** detalhes, escolha da quantidade de ingressos e botão "Ir para o pagamento".
- **Checkout:** é externo. Configure o endereço em `js/config.js`.

## Estrutura

```
index.html        página única (agenda + evento, via #agenda e #evento-<id>)
css/style.css     visual (cores e fontes no topo do arquivo)
js/config.js      endereço do checkout e limite de ingressos por pedido
js/eventos.js     lista de eventos (hoje com EXEMPLOS)
js/app.js         calendário, lista, página do evento e envio para o checkout
assets/           logo e fotos
```

## Como ver

Abra `index.html` no navegador ou rode um servidor simples:

```
python3 -m http.server 8000
```

## Checkout externo

Com `checkoutUrl` preenchido, o botão leva para:

```
<checkoutUrl>?evento=<id>&quantidade=<n>&titulo=...&data=AAAA-MM-DD&horario=HH:MM&preco_unitario=180.00&total=360.00
```

Os parâmetros da URL podem ser alterados por qualquer pessoa. Por isso, o checkout deve cobrar
com base apenas em `evento` e `quantidade`, buscando o preço e as vagas na própria base dele.
Os outros campos servem só para exibição.

Enquanto `checkoutUrl` estiver vazio, o botão abre uma janela de pré-visualização com esses dados.

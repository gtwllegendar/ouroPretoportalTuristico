# Portal Turístico de Ouro Preto

Portal turístico responsivo dedicado à cidade histórica de Ouro Preto (MG), patrimônio da humanidade desde 1980. O projeto apresenta pontos turísticos, galeria de imagens, eventos, opções de hospedagem e um formulário demonstrativo de contato.

## Sobre o projeto

A interface combina identidade visual inspirada no Barroco mineiro e na paisagem colonial com uma experiência responsiva baseada em HTML5, CSS3 e Bootstrap 5.

O portal reúne:

- navegação responsiva com efeito ao rolar a página;
- apresentação histórica e cultural de Ouro Preto;
- filtros para pontos turísticos e categorias de hospedagem;
- modais com detalhes dos principais atrativos;
- carrossel e galeria com lightbox;
- agenda cultural com avisos sobre atualização de datas;
- validação front-end do formulário de contato; e
- animações sutis e suporte a usuários que preferem movimento reduzido.

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript
- Bootstrap 5.3
- Bootstrap Icons
- Google Fonts
- Intersection Observer API

## Estrutura do projeto

```text
ouroPreto/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── atracao-casa-contos.jpg
│       ├── atracao-matriz-pilar.jpg
│       ├── atracao-praca-tiradentes.jpg
│       ├── atracao-sao-francisco.jpg
│       ├── evento-semana-santa.jpg
│       └── hero-ouro-preto.jpg
└── Estrutura de Pastas.txt
```

## Principais funcionalidades

### Navegação

- menu responsivo;
- links para as seções da página;
- destaque do item ativo durante a navegação; e
- botão para voltar ao topo.

### Pontos turísticos

Os cartões podem ser filtrados entre todas as atrações, arquitetura barroca e história/museus. Cada item abre um modal com descrição, localização, destaques e orientações de visita.

### Galeria

A galeria possui um carrossel em destaque e um grid de imagens ampliáveis em lightbox.

### Hospedagem

A seção apresenta categorias ilustrativas de hospedagem em diferentes regiões da cidade. Os dados são claramente identificados como conteúdo demonstrativo e não representam estabelecimentos cadastrados.

### Contato

O formulário valida campos obrigatórios, formato de e-mail e tamanho da mensagem diretamente no navegador. Como o projeto não possui backend, nenhuma mensagem é enviada pela internet.

## Como executar

1. Baixe ou clone este repositório:

```bash
git clone https://github.com/gtwllegendar/ouroPretoportalTuristico.git
```

2. Acesse a pasta do projeto:

```bash
cd ouroPretoportalTuristico/ouroPreto
```

3. Abra o arquivo `index.html` no navegador.

Também é possível iniciar um servidor local:

```bash
python -m http.server 8000
```

Em seguida, acesse `http://localhost:8000`.

## Publicação no GitHub Pages

Para publicar o projeto:

1. Acesse **Settings** no repositório.
2. Entre em **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/(root)`.

Como o site está na pasta `ouroPreto`, a página pode exigir que o repositório use essa pasta como origem ou que o conteúdo seja movido para a raiz.

## Acessibilidade

- suporte à navegação por teclado;
- link para pular diretamente ao conteúdo principal;
- atributos ARIA em componentes interativos;
- textos alternativos nas imagens;
- estados visuais de foco; e
- redução de animações quando configurada pelo sistema.

## Observações

Datas de eventos culturais e horários de visita devem ser confirmados nos canais oficiais da Prefeitura de Ouro Preto e da UFOP. Os cartões de hospedagem são modelos demonstrativos e não constituem indicações comerciais reais.

## Autoria

Desenvolvido por **Gtwl**.

## Licença

Este projeto não possui uma licença definida. Entre em contato com o autor antes de reutilizar o código ou os materiais do projeto.

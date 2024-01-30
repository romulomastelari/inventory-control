<h1 align="center">Controle de estoque</h1>

<p align="center">
<img alt="" src="https://img.shields.io/github/last-commit/romulomastelari/galeraJavaScript?color=4da1cd" />
<img alt="" src="https://img.shields.io/github/repo-size/romulomastelari/galeraJavaScript?color=4da1cd" />
<img alt="" src="https://img.shields.io/github/languages/count/romulomastelari/galeraJavaScript?color=4da1cd" />
<img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=E51C44&labelColor=0A1033"/>
</p>

<h3 align="center">Imagem prévia da aplicação</h3>

<div align="center">
  
  ![PetLife - Google Chrome 2023-10-24 16-21-38](https://github.com/romulomastelari/petLife/assets/97125052/e932ec93-6762-40fd-bfb5-c966573fe35f)

</div>

<br/>

## 💻 Projeto

Descrição do projeto:

- Intro da aplicação
- Origem da aplicação?
- Por que fez e sua utilidade?

Essa aplicação foi desenvolvida para estudos seguindo os ensinamentos do professor **[Marcos Júnior Passarella Naves](https://www.udemy.com/course/curso-de-angular-15-do-iniciante-ao-especialista/#instructor-1)** no curso de Formação Angular - 2024 **[Formação Angular - 2024](https://www.udemy.com/course/curso-de-angular-15-do-iniciante-ao-especialista/)** .

Nele abordamos a criação de um projeto de um Controle de estoque em <strong>Angular</strong>.

Contendo anotações e comentários particulares servindo de consulta para novos projetos.

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Angular](https://angular.io/docs)
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [TypeScript](https://www.typescriptlang.org/docs/)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```
$ git clone <https://github.com/romulomastelari/inventory-control.git>

$ cd nome-do-repo
```

Para iniciá-lo, siga os passos abaixo:

```
Deve-se dentro a pasta do back(stock-api) instalar o yarn.. Então yarn install e logo após yarn dev para rodar o servidor.
E dentro do front-end(inventory-control) deve-se instalar o Angular.. npm i e logo após a instalação npm dev para rodar o front.
```

<br />

## 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.notion.so/LICENSE.md) para mais detalhes.

<br />

## 📓 Anotações pessoais

```
npm install ngx-cookie-service --save - biblioteca a ser trabalhada com cookies
Biblioteca de dashboard -> npm install chart.js --save (utilização de primeNG)

Utilizando casting do typescript, para enviar os dados com o tipo que o serviço está esperando ex: this.signupForm.value as SignupUserRequest
Toast para customizar mensagens com MessageService.

ngModules são ambiente emcapsulados.. como blocos que possuiem todas as importações como bibliotecas, serviços, components.. Também podem importar funcionaldiades de outros modulos..
RootModules -> modulo raiz mais conhecido como app.module
FeaturesModules -> vários componenets que necessitam ser utilizados diversas vezes em outros components como botões, toolbars, inputs, serviços, pipes.. Geralmente chamado de SharedModule.

LazyloadingModules com rotas -> Modulos sobre demanda, só serão carregados quando acessados.. ex: /home só será baixado todo o bundle(modulos..) quando acessado.. econimizando "espaço"
Guarda de rotas -> mediar quem pode ou não acessar uma rota especifica.

Pipe - um cano de agua, onde se passa várias informações, com o pipe conseguimos manipular os dados ali passados conforme queremos.. ex: map do rxjs buscando os produtos que tiverem amount maior que 0
Pipes@ funções simples para utilizar no template HTML exemplo transformar em dados monetarios(R$), pipe aceita um valor de entrada e assim retornam um valor "editado" @Pipes pré definidos do angular(currency, data, uperCase, decimal..)
PIPE ASYNC - se increve em um observable e ele retorna o ultimo valor que esse observable emitiu, quando saido daquele component ele se desinscreve automaticamente.
BehaviorSubject - é possivel ter acesso ao valor anterior, mesmo sem ter pego o valor anteriormente.
Destroy com takeUntil - operador takeUntil concluir o fluxo quando o operador Destroy emitir um valor.. então quando component for destruido o ngOnDestroy e vai emitir um novo valor para o takeUntil, então ele limpará a assinatura.

@Input passando dados do pai para o filho ex? [products]="productsList" filho recebendo os dados do productsList pelo input no html products
@Output passando dados do filho para o pai ex? [products]="productsList" ex? espera receber uma funcao do pai ent'ao assim consigo utilizar os dados daquela funcao no component filho

Melhoria de performance com preLoadingStrategy, após carregar o modulo principal fazermos cache dos proximos modulos da aplicação assim aumentando a performance da aplicação.
```

<br />

---

<br />

<div align="center">
<a href="https://github.com/romulomastelari">
<img src="https://github.com/romulomastelari.png" width="100px;" alt="" style="border-radius:50% box-shadow: 0 2px 2px rgba(0,0,0, .5);" />
<br />
<sub><b>Romulo Mastelari</b></sub></a>

📌 Só boraaaa! Sempre para frente :) 🚀🚀🚀
</div>

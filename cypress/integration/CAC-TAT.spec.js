/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => cy.visit('./src/index.html'))
    const Textao = 'Primeiro teste Cypress. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse finibus bibendum lectus, id condimentum magna venenatis ac. Quisque nec est suscipit, rutrum arcu sit amet, lacinia orci. Nunc tristique eget quam ut sagittis. In non tempus magna, ac maximus est. Sed quis tempus justo, eget semper dui. Vivamus orci ligula, congue vitae libero at, feugiat gravida erat. Sed ac risus vel libero eleifend feugiat sed ut magna. Vivamus ornare libero vitae neque vehicula imperdiet. Nullam at facilisis odio. Donec eget fermentum mi. Nulla fermentum porttitor sollicitudin. Suspendisse potenti. Fusce fermentum consequat tellus nec dictum. Donec ut sagittis urna.'

    it('verifica o título da aplicação', function() {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
          
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName').type('José')
        cy.get('#lastName').type('Fernando dos Santos')
        cy.get('#email').type('jferniesantos@gmail.com')
        cy.get('#open-text-area').type(Textao, {delay:0})
        cy.contains('button','Enviar').click()
        // o "." (ponto) significa que é uma classe.
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('José')
        cy.get('#lastName').type('Fernando dos Santos')
        cy.get('#email').type('jferniesantos@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {

        cy.get('#phone')
          .type('abcd')
          .should('have.value', '' )        

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

        cy.get('#firstName').type('José')
        cy.get('#lastName').type('Fernando dos Santos')
        cy.get('#email').type('jferniesantos@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {

        cy.get('#firstName')
          .type('José')
          .should('have.value','José')
          .clear()
          .should('have.value','')
        cy.get('#lastName')
        .type('Fernando dos Santos')
        .should('have.value','Fernando dos Santos')
        .clear()
        .should('have.value','')
        cy.get('#email')
        .type('jferniesantos@gmail.com')
        .should('have.value','jferniesantos@gmail.com')
        .clear()
        .should('have.value','')
        cy.get('#phone')
          .type('79999277374')
          .should('have.value','79999277374')
          .clear()
          .should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function(){

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (Youtube) por seu texto', function(){

        cy.get('#product')
          .select('YouTube')
          .should('have.value','youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor', function(){

        cy.get('#product')
          .select('mentoria')
          .should('have.value','mentoria')

    })

    it('seleciona um produto (Blog) por seu indice', function(){

        cy.get('#product')
          .select(1)
          .should('have.value','blog')

    })

    
    it('marca o tipo atendimento "Feedback"', function(){

        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value','feedback')

    })

    it('marca cada tipo atendimento', function(){

        cy.get('input[type="radio"]')
          .should('have.length',3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })

    })

    it('marca ambos chekboxes, depois desmarca o último', function(){

        cy.get('input[type="checkbox"]')
          .check().should('be.checked')
          .last().uncheck().should('not.be.checked')
    })
    
    
    it('seleciona um arquivo da pasta fixtures', function(){

        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
        
    it('seleciona um arquivo simulando drag-and-drop', function(){

        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){

      cy.get('#privacy a')
      .should('have.attr','target','_blank')
       
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){

      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')

    })

  })
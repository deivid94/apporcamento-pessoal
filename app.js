class Depesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }
  validarDados(){
    for (let i in this){
      if(this[i] == undefined||this[i] == ''|| this[i] == null){
        return false
      }
    }
    return true
  }
}

class Bd {
  constructor(){
    let id = localStorage.getItem('id')
    if(id === null){
      localStorage.setItem('id',0)
    }
  }
  getProximoId(){
    let  proximoId = localStorage.getItem('id')
    return parseInt(proximoId)+1
  }
  gravar(d) {
    let id = this.getProximoId()
    localStorage.setItem(id, JSON.stringify(d));
    localStorage.setItem('id',id)
  }

  recuperarTodosRegistros(){
    //array despesa

      let despesas = Array() // criado um array para indexar as dispesas

    let id = localStorage.getItem('id')
    // recuperar todas as despesas de local storage
    for (let i = 1; i<=id; i++){
      let despesa = JSON.parse(localStorage.getItem(i)) // JSON.parse transforma stream em objetos literais
        
        if (despesa === null ){
          continue

        }
        despesas.id = i
        despesas.push(despesa) // inputando despesa dentro do array despesas

    }
    return despesas
    }
    pesquisar(despesas){
      let despesasFiltradas = Array()
      despesasFiltradas = this.recuperarTodosRegistros()

      console.log (despesasFiltradas)
      console.log (despesas)

      // filtros
      
      // ano
      if (despesas.ano != ''){
      despesasFiltradas =  despesasFiltradas.filter(d => d.ano == despesas.ano)
      }

      //mes
      if (despesas.mes != ''){
      despesasFiltradas =  despesasFiltradas.filter(d => d.mes == despesas.mes)
      }
      //dia 
      if (despesas.dia != ''){
      despesasFiltradas =  despesasFiltradas.filter(d => d.dia == despesas.dia)
      }
      //tipo
      if (despesas.tipo != ''){
      despesasFiltradas =  despesasFiltradas.filter(d => d.tipo == despesas.tipo)
      }
      //descricao
      if (despesas.descricao != ''){
      despesasFiltradas =  despesasFiltradas.filter(d => d.descricao == despesas.descricao)
      }

      //valor
      
      if (despesas.valor != ''){
        despesasFiltradas =  despesasFiltradas.filter(d => d.valor == despesas.valor)
        }
      return despesasFiltradas

    }
    remover (id){
    localStorage.removeItem(id)
    }
  }
  


let bd = new Bd()

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Depesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );
    if (despesa.validarDados()){
      bd.gravar(despesa);


      document.getElementById('modalLabel').innerHTML = "Objeto gravado com sucesso"
      document.getElementById('modal').className = "modal-header text-success"
      document.getElementById('modal-conteudo').innerHTML= "Registro inserido com sucesso"
      document.getElementById('modal_botao').innerHTML= "Voltar"
      document.getElementById('modal_botao').className = "btn-success"
      
      
      

   

   $('#modalRegistraDespesa').modal('show')
    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''
   
    }else {
      //dialog de erro

      document.getElementById('modalLabel').innerHTML = "Erro na Inclusao do registro"
      document.getElementById('modal').className = "modal-header text-danger"
      document.getElementById('modal-conteudo').innerHTML= "Alguns campos nao foram preenchidos"
      document.getElementById('modal_botao').innerHTML= "Voltar e Corrigit"
      document.getElementById('modal_botao').className = "btn-danger"
      $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas (){

  let despesas = Array()

  despesas = bd.recuperarTodosRegistros()

  // selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById('listaDespesas')

  //percorrer o array despesas, listado cada despesa de forma dinamica
  despesas.forEach(function(d) {
    // criando a linha (tr)
   let linha =  listaDespesas.insertRow()
   //criar as colunas (td)
   linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
   
   switch(d.tipo){
    case '1': d.tipo = 'Alimentacao'
    break
    case '2': d.tipo = 'Educacao'
    break
    case '3': d.tipo = 'Lazer'
    break
    case '4': d.tipo = 'Saude'
    break
    case '5': d.tipo = 'Transporte'
    break
    
   }
   linha.insertCell(1).innerHTML = d.tipo
   linha.insertCell(2).innerHTML = d.descricao
  linha.insertCell(3).innerHTML = d.valor

   // criar o botao de exclusao
    let btn = document.createElement("button")
    btn.className = 'btn btn-danger'
    btn.innerHTML = '<i class="fas fa-times"></i>'
    btn.id = `id_despesa_${d.id}`
    btn.onclick = function(){ //remover despesa
     
      let id = this.id.replace('id_despesa', '')
      bd.remover(id)
      window.location.reload()
    }
    linha.insertCell (4).append(btn)
    console.log(d)
  })

}

function pesquisarDespesas() {

  let ano  = document.getElementById('ano').value
  let mes  = document.getElementById('mes').value
  let dia  = document.getElementById('dia').value
  let tipo  = document.getElementById('tipo').value
  let descricao  = document.getElementById('descricao').value
  let valor  = document.getElementById('valor').value

  let despesas = new Depesa (ano, mes, dia, tipo, descricao, valor)
   let despesa = bd.pesquisar(despesas)



  bd.pesquisar(despesas)

  let listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML = ''


  //percorrer o array despesas, listado cada despesa de forma dinamica
  despesa.forEach(function(d) {
    // criando a linha (tr)
   let linha =  listaDespesas.insertRow()
   //criar as colunas (td)
   linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
   
   switch(d.tipo){
    case '1': d.tipo = 'Alimentacao'
    break
    case '2': d.tipo = 'Educacao'
    break
    case '3': d.tipo = 'Lazer'
    break
    case '4': d.tipo = 'Saude'
    break
    case '5': d.tipo = 'Transporte'
    break
    
   }
   linha.insertCell(1).innerHTML = d.tipo
   linha.insertCell(2).innerHTML = d.descricao
   linha.insertCell(3).innerHTML = d.valor
  })


}

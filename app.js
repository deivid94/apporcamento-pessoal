class Depesa {
  constructor(ano,mes,dia,tipo,descrisao,valor){
    this.ano = ano
    this.mes = mes
    this.dia = dia
    this.tipo = tipo
    this.descricao = descrisao
    this.valor = valor
  }
 }

function cadastartDespesa(){
 let  ano = document.getElementById('ano')
  let  mes = document.getElementById('mes')
  let dia =document.getElementById('dia')
  let tipo = document.getElementById('tipo')
  let descricao = document.getElementById('descricao')
   let valor = document.getElementById('valor')
   
   let despesa = new Depesa(ano.value, mes.value, tipo.value, descricao.value, valor.value)

   console.log(despesa)
  
}


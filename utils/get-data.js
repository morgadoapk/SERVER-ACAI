function getDataAtual() {
  const data = new Date()
  const dia = data.getDate().toString()
  const mes = (data.getMonth() +1).toString().padStart(2, '0')
  const ano = data.getFullYear().toString()

  const atualDate = {data: `${dia}/${mes}/${ano}`} 

  return atualDate
}

module.exports = getDataAtual
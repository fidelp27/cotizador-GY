
//variables
  let alquiler = parseInt(document.getElementById('alquiler'));
  let expensas = parseInt(document.getElementById('expensas'));
  let tiempo = parseInt(document.getElementById('tiempo'));
  let ajuste = parseFloat(document.getElementById('ajuste')/100);
  let iva = document.getElementById('iva');
  let total = document.getElementById('total');
  let optVivienda = document.querySelector('.vivienda')
  let optComercial = document.querySelector('.comercial')
  let selComercial = document.querySelector('.contain-option-comercial')
  let btnCalcular = document.querySelector('.act-btn')
  let btnClear = document.querySelector('.clear-btn')
  let tipoAjuste = document.querySelector('.tipo-ad')
  let promocion = document.querySelector('.offer')
  let customPromo = document.querySelector('.custom_promo')
  let total_garantia = document.querySelector('.total_garantia')
  let totalidad = document.querySelector('.totalidad')
  let total_tresPagos = document.querySelector('.tres_pagos')
  let total_masCuotas = document.querySelector('.mas_cuotas')
  let optionVivienda = document.querySelector('.option-vivienda')
  let descuento_1pago;
  let descuento_3cuotas;
  let descuento_cuotas;
  let totalGarantiaVivienda;
  let totalGarantiaComercial;
  let tres_cuotas = document.querySelector('.tresCuotas');
  let adelanto = document.querySelector('.adelanto')
  let cuatro_cuotas = document.querySelector('.cuatro_cuotas_fijas');
  let cinco_cuotas = document.querySelector('.cinco_cuotas_fijas');
  let porcentaje = 0.06;
  let btnPDF = document.querySelector('.pdf')

  let promedio;
  let arrAjustes = [];
  let arrAjustado;
  let tiempoAjustes;


showHideComercial()


///////////////////// Botones ///////////////////////
btnCalcular.addEventListener('click', (e)=>{
  e.preventDefault();
  if (optVivienda.checked) {
    calcAlquilerVivienda();
  }else if (optComercial.checked) {
    calcAlquilerComercial()
  }
})

btnPDF.addEventListener('click', ()=>{
    getScreen()
})

btnClear.addEventListener('click', ()=>{
  window.location.reload()

})
promo()
////////////CALCULO///////////////////////

function calcAlquilerVivienda(){
  alquiler = parseInt(document.getElementById('alquiler').value);
  expensas = parseInt(document.getElementById('expensas').value);
  tiempo = parseInt((document.getElementById('tiempo').value)*12);
  total = document.getElementById('total');


  totalGarantiaVivienda = parseInt((alquiler+expensas)*tiempo*porcentaje)
  total.innerHTML = `$ ${totalGarantiaVivienda}`;
  total_garantia.innerHTML = `Total Garantía $ ${totalGarantiaVivienda}`;
  mostrarDatos()
}

function calcAlquilerComercial(){
  alquiler = parseInt(document.getElementById('alquiler').value);
  expensas = parseInt(document.getElementById('expensas').value);
  tiempo = parseInt((document.getElementById('tiempo').value)*12);
  total = document.getElementById('total');
  iva = document.getElementById('iva').checked;
  let ajuste_valor = document.querySelector('.ajuste_valor')
  ajuste_valor.classList.remove('hide')

  promedioAlquiler()
  mostrarDatos()
  calculoIVA()

}


//////////////Fraccionar Intervalos///////////////////////
function tiempoAjuste(){
  tipoAjuste.addEventListener('change', ()=>{
    tiempo = parseInt((document.getElementById('tiempo').value)*12);
    if (tipoAjuste.value == "SEMESTRAL") {
      tiempoAjustes = tiempo / 6;
    }else if (tipoAjuste.value == "TRIMESTRAL") {
      tiempoAjustes = tiempo / 3;
      console.log(tiempoAjustes);
    }else if (tipoAjuste.value == "ANUAL") {
      tiempoAjustes = tiempo/12;
      console.log(tiempoAjustes);
    }
  })
}

//////////////////////////Promedio Alquiler//////////////////
function promedioAlquiler(){
  alquiler = parseInt(document.getElementById('alquiler').value);
  tiempo = parseInt((document.getElementById('tiempo').value)*12);
  ajuste = parseFloat(document.getElementById('ajuste').value/100);
  tiempoAjuste()

  for (let i = 0; i < tiempoAjustes -1; i++) {
    arrAjustes[0] = alquiler;
    arrAjustes[i+1] = (arrAjustes[i] + (arrAjustes[i]*ajuste))
  }

  promedio = arrAjustes.reduce((a, b) => {
    return a + b/(tiempoAjustes)
  },0)
}
promedioAlquiler()


//////////////////////IVA al costo////////////////////////////////
function calculoIVA(){
  if (iva) {
    totalGarantiaComercial = parseInt((promedio+expensas)*tiempo*porcentaje*1.21)
    total.innerHTML = `$ ${parseInt(totalGarantiaComercial)}`;
    total_garantia.innerHTML = `Total Garantía $ ${parseInt(totalGarantiaComercial)}`;
  }else {
    totalGarantiaComercial = parseInt((promedio+expensas)*tiempo*porcentaje)
    total.innerHTML = `$ ${parseInt(totalGarantiaComercial)}`;
    total_garantia.innerHTML = `Total Garantía $ ${parseInt(totalGarantiaComercial)}`;
  }
}

///////////////////////////Promocion//////////////////////////////////

function promo(){
  promocion = document.querySelector('.offer')
  promocion.addEventListener('change', ()=>{    
    mostrarCoti()
    if (promocion.value == 1) {
      descuento_1pago = 0.2;
      descuento_3cuotas = 0.08;
      descuento_cuotas = 0
    }else if (promocion.value == 2) {
      descuento_1pago = 0.2;
      descuento_3cuotas = 0.1;
      descuento_cuotas = 0.05
    }else if (promocion.value == 3) {
      descuento_1pago = 0.2;
      descuento_3cuotas = 0.2;
      descuento_cuotas = 0.2;
    }else if (promocion.value == 4) {
      descuento_1pago = 0.3;
      descuento_3cuotas = 0.2;
      ocultarCuotas()
    }else if (promocion.value == 5 || promocion.value == 6 || promocion.value == 7 ||
    promocion.value == 8 || promocion.value == 9 || promocion.value == 10) {
      descuento_1pago = 0.15;
      descuento_3cuotas = 0.15;
      descuento_cuotas = 0.15;
    }else if (promocion.value == 11) {
      descuento_1pago = 0.25;
      descuento_3cuotas = 0.15;
      descuento_cuotas = 0.15;
    }
    formasDePago()
  })

}

////////////Formas de Pago//////////////////
function formasDePago(){
    mostrarFecha()
    if (optVivienda.checked) {

      totalidad.innerHTML = `Total 1 pago en efectivo: $ ${parseInt(totalGarantiaVivienda*(1 - descuento_1pago))} <sup>Ahorro $ ${parseInt(totalGarantiaVivienda - (totalGarantiaVivienda*(1 - descuento_1pago)))}`;
      total_tresPagos.innerHTML = `Total 3 cuotas: $ ${parseInt(totalGarantiaVivienda*(1 - descuento_3cuotas))} <sup>Ahorro $ ${parseInt(totalGarantiaVivienda - (totalGarantiaVivienda*(1 - descuento_3cuotas)))}`;
      tres_cuotas.innerHTML = `3 cuotas fijas en efectivo: $ ${parseInt((totalGarantiaVivienda*(1 - descuento_3cuotas))/3)}`
      total_masCuotas.innerHTML = `Total 6 cuotas: $ ${parseInt(totalGarantiaVivienda*(1 - descuento_cuotas))}  <sup>Ahorro $ ${parseInt(totalGarantiaVivienda - (totalGarantiaVivienda*(1 - descuento_cuotas)))}`;
      adelanto.innerHTML = `Cuota 1 en efectivo: $ ${parseInt((totalGarantiaVivienda*(1 - descuento_cuotas))*0.25)}`
      cuatro_cuotas.innerHTML = `4 cuotas fijas: $ ${parseInt(((totalGarantiaVivienda - (totalGarantiaVivienda*(1 - descuento_cuotas))*0.25))/4)}`
      cinco_cuotas.innerHTML = `5 cuotas fijas: $ ${parseInt(((totalGarantiaVivienda - (totalGarantiaVivienda*(1 - descuento_cuotas))*0.25))/5)}`

    } else if (optComercial.checked) {
      totalidad.innerHTML = `Total 1 pago en efectivo: $ ${parseInt(totalGarantiaComercial*(1 - descuento_1pago))}          <sup>Ahorro $ ${parseInt(totalGarantiaComercial - (totalGarantiaComercial*(1 - descuento_1pago)))}`;
      total_tresPagos.innerHTML = `Total 3 cuotas: $ ${parseInt(totalGarantiaComercial*(1 - descuento_3cuotas))}          <sup>Ahorro $ ${parseInt(totalGarantiaComercial - (totalGarantiaComercial*(1 - descuento_3cuotas)))}`;
      tres_cuotas.innerHTML = `3 cuotas fijas en efectivo: $ ${parseInt((totalGarantiaComercial*(1 - descuento_3cuotas))/3)}`
      total_masCuotas.innerHTML = `Total 6 cuotas: $ ${parseInt(totalGarantiaComercial*(1 - descuento_cuotas))}         <sup>Ahorro $ ${parseInt(totalGarantiaComercial - (totalGarantiaComercial*(1 - descuento_cuotas)))}`;
      adelanto.innerHTML = `Cuota 1 en efectivo: $ ${parseInt((totalGarantiaComercial*(1 - descuento_cuotas))*0.25)}`
      cuatro_cuotas.innerHTML = `4 cuotas fijas: $ ${parseInt(((totalGarantiaComercial - (totalGarantiaComercial*(1 - descuento_cuotas))*0.25))/4)}`
      cinco_cuotas.innerHTML = `5 cuotas fijas: $ ${parseInt(((totalGarantiaComercial - (totalGarantiaComercial*(1 - descuento_cuotas))*0.25))/5)}`
    }
}

/////////////////////////////Fecha//////////////////////////////7
function mostrarFecha(){
  let fecha = document.querySelector('.date')
  let date = new Date();
  fecha.innerHTML = date.toLocaleDateString();
}

///Ocultar - Mostrar /////////
function mostrarCoti(){
  let aside = document.querySelector('aside')
  aside.classList.remove('hide')
}
function showHideComercial(){
  optComercial.addEventListener('change', ()=>{
    selComercial.classList.remove('hide')
  })

  optVivienda.addEventListener('change', ()=>{
    selComercial.classList.add('hide')
  })
}
function ocultarCuotas(){
  let grupo_cuotas = document.querySelectorAll('.grupo_cuotas')
    for (let item of grupo_cuotas) {
      item.classList.add('hide')
    }
}
function mostrarPagos(){
  let coti_una = document.querySelector('#coti_una')
  let coti_tres = document.querySelector('#coti_tres')
  let coti_mas = document.querySelector('#coti_mas')
  let unaCuota = document.querySelector('.totalidad')
  let tresCuota = document.querySelector('.tres_container')
  let masCuota = document.querySelector('.masCuotas_container')

  coti_una.addEventListener('change', ()=>{
      unaCuota.classList.toggle('hide')
  })
  coti_tres.addEventListener('change', ()=>{
      tresCuota.classList.toggle('hide')
  })
  coti_mas.addEventListener('change', ()=>{
      masCuota.classList.toggle('hide')
  })
}
mostrarPagos()
function mostrarDatos(){
    let alquiler_valor = document.querySelector('.alquiler_valor')
    let expensas_valor = document.querySelector('.expensas_valor')
    let ajuste_valor = document.querySelector('.ajuste_valor')
    alquiler_valor.innerHTML = `Alquiler: $ ${alquiler}`
    expensas_valor.innerHTML = `Expensas: $ ${expensas}`
    ajuste_valor.innerHTML = `Ajuste: ${ajuste*100}%`
}

//////////////////Capturar pantalla y Crear PDF///////////////
function getScreen(){

  let divSel = document.querySelector('.coti-info')
  let box1 = document.querySelector('.box1')
  html2canvas(divSel) // Llamar a html2canvas y pasarle el elemento
     .then(canvas => {
       // Cuando se resuelva la promesa traerá el canvas
       box1.appendChild(canvas); // Lo agregamos como hijo del div
       var imgdata = canvas.toDataURL('image/png',1.0)
       var doc = new jsPDF('p', 'mm', [120, 140])
       doc.addImage(imgdata,'PNG', 5,8)
       doc.save("cotizacionGY.pdf")
     });
}

/* Objeto PRESUPUESTO */
function Presupuesto() {
  this.presupuesto = 0;
  this.gastos = [];
  this.saldo = 0;
}

Presupuesto.prototype.agregarPresupuesto = function (presupuesto) {
  if (presupuesto > 0) {
    this.presupuesto = presupuesto;
  } else {
    alert("Debe ingresar un monto diferente.");
  }
};

Presupuesto.prototype.agregarGasto = function (nombre, valor) {
  if (valor > 0) {
    this.gastos.push({ nombre, valor });
  } else {
    alert("Debe ingresar un monto diferente.");
  }
};

Presupuesto.prototype.totalGasto = function () {
  let totalGasto = 0;
  this.gastos.forEach((gasto) => {
    totalGasto += gasto.valor;
  });
  return totalGasto;
};

Presupuesto.prototype.calcularSaldo = function () {
  this.saldo = this.presupuesto - this.totalGasto();
  return this.saldo;
};

const miPresupuesto = new Presupuesto();

$(() => {
  $("#formPresupuesto").on("submit", function (event) {
    event.preventDefault();

    let inputPresupuesto = $("#inputPresupuesto").val();

    miPresupuesto.agregarPresupuesto(parseInt(inputPresupuesto));
    actualizarInfo();
    this.reset();
  });

  $("#formGastos").on("submit", function (event) {
    event.preventDefault();

    let inputNombreGasto = $("#inputNombreGasto").val();
    let inputValorGasto = $("#inputCantidadGasto").val();

    miPresupuesto.agregarGasto(inputNombreGasto, parseInt(inputValorGasto));
    actualizarInfo();
    actualizarTabla();

    this.reset();
  });

  $("#cuerpoTabla").on("click", "#eliminarFila", function (event) {
    let fila = $(this).closest("tr");
    let nombre = fila.find("td:eq(0)").text();
    let valor = fila.find("td:eq(1)").text();

    let nuevoGastos = miPresupuesto.gastos.filter((gasto) => {
      return gasto.nombre !== nombre && gasto.valor !== valor;
    });

    miPresupuesto.gastos = nuevoGastos;
    actualizarInfo();
    actualizarTabla();
  });
});

function actualizarTabla() {
  let filaGasto = "";

  miPresupuesto.gastos.forEach((gasto) => {
    filaGasto += `
              <tr>
                  <td scope="row">${gasto.nombre}</td>
                  <td >${gasto.valor}</td>
                  <td><a id="eliminarFila" class="fa fa-trash" aria-hidden="true"></a></td>
              <tr>
          `;
  });
  $("#cuerpoTabla").html(filaGasto);
}

function actualizarInfo() {
  $("#txtPresupuesto").text(miPresupuesto.presupuesto.toLocaleString());
  $("#txtGastos").text(miPresupuesto.totalGasto().toLocaleString());
  $("#txtSaldo").text(miPresupuesto.calcularSaldo().toLocaleString());
}

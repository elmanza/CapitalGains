

export default class Share {

  constructor(operations){
    this.ops = operations;
    this.response = [];
    // Estructura para almacenar la información de la inversión actual
    this.inversion = {
      precioTotal: 0,
      totalShares: 0,
      precioPromedio: 0,
      perdidaAcumulada: 0
    };
  }

  procces(){
    for (const op of this.ops) { this.response.push(this[`process${op.operation}`](op)); }
    return this.response;
  }

  // Función para procesar una operación de compra
  processbuy({"unit-cost":precio, "quantity": cantidad}) {
    // Actualizar la estructura de inversión
    this.inversion.precioTotal += precio * cantidad;
    this.inversion.precioPromedio = this.calcularPrecioPromedio(precio, cantidad);  
    this.inversion.totalShares += cantidad;  
    let zero = 0;
    return { tax: parseFloat(0).toFixed(2) };
  }

  // Función para calcular el precio promedio ponderado
  calcularPrecioPromedio(precio, cantidad) {
    return ((this.inversion.totalShares * this.inversion.precioPromedio) + (cantidad * precio)) / (this.inversion.totalShares + cantidad).toFixed(2);
  }

  // Función para procesar una operación de venta
  processsell({"unit-cost":precio, "quantity": cantidad}) {
    const impuesto = this.calcularImpuesto(precio, cantidad);
    this.inversion.precioTotal -= precio * cantidad;
    this.inversion.totalShares -= cantidad;
    return { tax: parseFloat(impuesto).toFixed(2) };
  }


 

  // Función para calcular el impuesto a pagar
  calcularImpuesto(precioVenta, cantidadVenta) {

    const ingresoTransaccion = cantidadVenta * precioVenta; // El ingreso de la transacción es igual al total de la venta
    if(ingresoTransaccion <= 20000 && precioVenta > this.inversion.precioPromedio) return 0; // El ingreso no supera los 20000 y el precio fue mayor al precio promedio

    
    let gananciaBoolean = this.inversion.perdidaAcumulada == 0 && ingresoTransaccion > 20000 && precioVenta > this.inversion.precioPromedio ? true : false;
   
    let ganancia = (ingresoTransaccion - this.inversion.precioPromedio * cantidadVenta); // Calculamos la ganancia de la transacción

    if(gananciaBoolean){ return ganancia * 0.2; }

    const perdidaAcumulada = Math.abs(this.inversion.perdidaAcumulada);

    if(ingresoTransaccion > 20000 && ganancia > 0 && perdidaAcumulada > 0){
      if(ganancia > perdidaAcumulada){
        ganancia -= perdidaAcumulada;
        this.inversion.perdidaAcumulada = 0;
        return ganancia * 0.2;
      }else{
        this.inversion.perdidaAcumulada += ganancia;
        return 0;
      }    
    }
    

    // No se paga impuestos si la ganancia es menor o igual a $20,000
    if (ganancia > 0 && ganancia <= 20000) {
      if(perdidaAcumulada > 0){
        this.inversion.perdidaAcumulada = ganancia <= perdidaAcumulada ? this.inversion.perdidaAcumulada += ganancia : 0;
      }
      return 0;
    }

    // Si hay una pérdida acumulada, se descuenta de la ganancia
    if (this.inversion.perdidaAcumulada < 0 || ganancia <= 0) {
      if (ganancia > perdidaAcumulada) {
        ganancia -= perdidaAcumulada;
        this.inversion.perdidaAcumulada = 0;
      } else {
        this.inversion.perdidaAcumulada -= Math.abs(ganancia);
        return 0;
      }
    }
    
    return impuesto;
  }
}
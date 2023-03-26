import { dbank } from "../../declarations/dbank";

///Acción que se realiza cuando se recarga la página, se realiza el llamado a la función update(), y 
// por lo tanto se actualiza el valor de saldo áctual.
window.addEventListener("load", async function() {
  // console.log("Finished loading");
  update();
});

// Acción que se realiza cuando se modifica o se realiza una acción dentro del formulario
document.querySelector("form").addEventListener("submit", async function(event) {
  // Se utiliza para evitar que se recargue la página por un cambio
  event.preventDefault();
  // console.log("Submitted.");

  //Detector de eventos para el boton submit
  const button = event.target.querySelector("#submit-btn");

  //En estas variables se almacenan los valores que ingresan los usuarios en los inputs
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  //El botón se desactiva cuando se inserta una cantidad y mientras se ingresa el dinero, para evitar que el
  // usuario presione el botón varias veces mientras se realiza la transacción.
  button.setAttribute("disabled", true);

  //Este condicional se agrega para que no pase nada cuando de deja vacío el input de agregar dinero, ya que la 
  // función topUp(), solo se activará si el valor de value.length es mayor a 0. Lo mismo pasa con la función withdaw.

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withdraw(outputAmount);
  }

  //Esta función se utiliza para actualizar constantemente el interes por segundo

  await dbank.compound();

  //Se realiza el llamado a la función update para que actualice el saldo de la persona al modificar el form
  update()

  //Estas dos lineas de código se encargan de eliminar el valor insertado en el input luego de realizar una transacción
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";


  //Luego de completar una transacción, con esta linea de código, el boton submit vuelve a estar activo
  button.removeAttribute("disabled");

});

//Se crea esta función para que se actualice el valor de saldo o cantidad áctual de la persona.
async function update() {
  const currentAmount = await dbank.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
};
const INTERESVEINTICUATRO = 0.45;
const INTERESDOCE = 0.30;
const INTERESSEIS = 0.15;

let queModelo = [];

fetch('/stockMotos.json')
    .then((res) => res.json())
    .then((stockMotos) => {

        stockMotos.forEach(stockMotos => {

            const divMoto = document.createElement("div");
            divMoto.classList.add("row", "g-4", "py-4");
            divMoto.innerHTML = `
    <div class="col p-1">
        <div class="card h-100"
            style="background: radial-gradient(50% 50% at 50% 50%, #88918d 0%, #3c3d3d 100%);">
            <img src="${stockMotos.imagen}" class="card-img-top" alt="${stockMotos.modelo}" />
            <div class="card-body text-white">
              <h5 class="card-title fs-1">${stockMotos.modelo}</h5>
              <p class="card-text">
                Marca: <b>${stockMotos.marca}</b> <br />
                Kilometros: ${stockMotos.kilometros}<br />
                Cilindrada: ${stockMotos.cilindrada}</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">
                <button href="#" id="consultar${stockMotos.id}" class="btn btnConsulta">Consultar</button>
            </small>
            <small class="text-muted">
                <button href="#" id="reserva${stockMotos.id}" class="btn btnReserva">Reservar</button>
            </small>

        </div>
    </div>
    `
            contenedorMotos.appendChild(divMoto);

            const button = document.getElementById(`consultar${stockMotos.id}`)
            button.addEventListener("click", () => {

                Toastify({
                    text: "Has hecho una consulta",
                    duration: 3000,
                    position: "left",
                    gravity: "bottom",
                    style: {
                        background: "linear-gradient(to right, #000000, #320299, #000000)",
                    },

                }).showToast();

                respuestaClick(stockMotos.id)
            })

            const buttonReserva = document.getElementById(`reserva${stockMotos.id}`)
            buttonReserva.addEventListener("click", () => {

                respuestaClickResv(stockMotos.id)
            })

            visualizarConsultas()

        })

        let arrayformReserva = [];

        function formularioReserva() {
            const contenedorReserva = document.querySelector("#formReserva")
            contenedorReserva.innerHTML = ""
            arrayformReserva.forEach(x => {
                const divReserva = document.createElement("div");
                divReserva.innerHTML = `
        <h3>INGRESE SUS DATOS PARA SU RESERVA</h3>
        <br>
        <h2>Modelo Elejido: <br> $${x.modelo}</h2>
        <br>
        <form id="subReserva" class="inputForm">
                    <input type="text" placeholder="Nombre" name="nombre" required>
                    <input type="text" placeholder="Apellido" name="apellido" required>
                    <input type="text" name="dni" placeholder="Introduzca su DNI"/ required>
                    <input type="email" placeholder="Correo Electronico" required>
                
                <br>
                <p>Eljita la Cantidad de Cuotas:</p>
                
                <select name="Cuotas a elegir">
                        <option value="84">84 Cuotas</option>
                        <option value="64">64 Cuotas</option>
                        <option value="48">48 Cuotas</option>
                        <option value="36">36 Cuotas</option>
                        <option value="24">24 Cuotas</option>
                        <option value="12">12 Cuotas</option>
                        <option value="6">6 Cuotas</option>
                        <option value="1">1 Cuotas</option>
                        <option value="contado">Al Contado</option>
                    </select
                <br>
                <input type="submit"  value="Reservar"></form>

        `
                contenedorReserva.append(divReserva)
                divReserva.className = "divReserv"

                const submitReserva = document.getElementById(`subReserva`)
                submitReserva.addEventListener("submit", (e) => {
                    e.preventDefault();
                    submitReserva.reset();

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Felicidades! 🥳 Has hecho una Reserva'
                    })

                    respuestaClickResv(moto.id)

                    localStorage.setItem("modeloMoto", JSON.stringify(queModelo))
                })
            });
        }


        function respuestaClickResv(motoId) {
            const motoSelecionada = stockMotos.find((moto) => moto.id === motoId)
            arrayformReserva.push(motoSelecionada)

            formularioReserva()
        }

        function respuestaClick(motoId) {
            const motoSelecionada = stockMotos.find((moto) => moto.id === motoId)
            queModelo.push(motoSelecionada)

            visualizarConsultas()
        }

        function calculoCuotas(modelo, cuotas, interes = 0) {
            return 'Precio total: ' + modelo + '\n Cantidad de cuotas: ' + cuotas + (interes == 0 ? '\n No posee Interes' : '\n Precio total con Interes: ' + (modelo + modelo * interes));
        }

        function opcionesCuotas(precio, cuotas, interes) {
            queModelo.calculo = calculoCuotas(precio, cuotas, interes)

            visualizarConsultas()
            return
        }

        function visualizarConsultas() {
            const contenedor = document.querySelector("#contenedorConsulta")
            contenedor.innerHTML = ""

            queModelo.forEach(x => {
                const precioMotos = document.createElement("div");
                precioMotos.innerHTML = `
        <h1>${x.modelo}:</h1>
        <br>
        <h2>Precio Total: <br> $${x.precio}</h2>
        <br>
        <p>24 Cuotas C/interes de <br> $${x.precio * INTERESVEINTICUATRO} </p>
        <br>
        <p>12 Cuotas C/interes de <br> $${x.precio * INTERESDOCE} </p>
        <br>
        <p>6 Cuotas C/interes de <br> $${x.precio * INTERESSEIS}</p>

        `
                contenedor.append(precioMotos)

                precioMotos.className = "precioMotos"
                localStorage.setItem("modeloMoto", JSON.stringify(queModelo))
            });
        }

        const vaciar = document.getElementById("vaciar")
        vaciar.addEventListener("click", () => {

            queModelo.length = 0
            arrayformReserva.length = 0
            visualizarConsultas()
            formularioReserva()
            localStorage.removeItem("modeloMoto")
        })
    })

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("modeloMoto")) {
        queModelo = JSON.parse(localStorage.getItem("modeloMoto"))

        visualizarConsultas()
        

    }
})
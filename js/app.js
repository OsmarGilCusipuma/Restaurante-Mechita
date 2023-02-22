
(()=>{
    const guardarCliente = document.querySelector("#guardar-cliente")
    guardarCliente.addEventListener("click", guardarInfo)
    let orden = []

    let arrayMesitas = []
    let idCliente = 0

    const cliente = {
        hora: "",
        mesas: []
    }

    const mesa = {
        numero: "",
        disponible: true
    }

    const lugares = document.querySelectorAll(".dot-shown")
    
    escogerMesa()
    function escogerMesa(){
        lugares.forEach((lugar,i)=>{
            mesa.numero = lugar.id
            arrayMesitas[i] = {...mesa}
            lugar.addEventListener("click",()=>{
                lugar.classList.toggle("dot-chosen")
                lugar.classList.add(`s${idCliente}`)
                cambiosMesas(arrayMesitas[i])
            })
        })
    }
    function cambiosMesas(mesa){
        mesa.disponible = !mesa.disponible

        //SI LA MESA SE DESOCUPA NO CAMBIAR EL ID
        if(!mesa.disponible){
            mesa.cliente = idCliente
        } else{
            mesa.cliente = -1
        }
    }

    function guardarInfo(){
        const hora = document.querySelector("#hora")
        cliente.hora = hora.value

        let arrTemp = arrayMesitas.filter(tab=>tab.cliente == idCliente)
        cliente.mesas = [...arrTemp]

        //Cerrar el modal
        const modalFormulario = document.querySelector("#formulario")
        const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario)
        modalBootstrap.hide()

        orden.push({...cliente,idCliente})
        console.log(orden)

        mostrarInfo(orden)
        idCliente++
    }

    function mostrarInfo(orden){
        const info = document.querySelector(".information")

        limpiarHTML(info)

        for(let i=0;i<orden.length;i++){
            const infoDiv = document.createElement("div")
            const ul = document.createElement("ul")
            const p = document.createElement("p")
            const p2 = document.createElement("p")
            
            infoDiv.classList.add("orden")
            info.appendChild(infoDiv)
            p.textContent = `Hora: ${orden[i].hora}`
            p2.textContent = "Mesa(s): "
            infoDiv.append(p,p2)

            for(let j=0;j<orden[i].mesas.length;j++){
                const li = document.createElement("li")
                li.textContent = orden[i].mesas[j].numero
                ul.appendChild(li)
            }

            infoDiv.appendChild(ul)
            const btnEliminar = document.createElement("button")
            btnEliminar.classList.add("btn", "btn-danger")
            btnEliminar.textContent = "Eliminar"
            infoDiv.append(btnEliminar)

            btnEliminar.onclick = ()=>{
                eliminarOrden(orden[i].idCliente)
            }
        }
    }

    function eliminarOrden(id){
        console.log(orden,id); //Si se borra el primer elemento pero el idCliente ya aumento -> seria 1, entonces al buscar orden[1] no hay porque solo hay orden[0]

        orden.forEach(or=>{
            if(or.idCliente == id){
                or.mesas.forEach(me=>{
                    cambiosMesas(me)
                })
            }
        })

        orden = orden.filter(ord=> ord.idCliente !== id)
        mostrarInfo(orden)

        const sitios = document.querySelectorAll(`.s${id}`)
        let sitiosTemp = []
        sitios.forEach(sit=>{
            sitiosTemp.push(sit.id)
        })

        for(let i=0;i<sitiosTemp.length;i++){
            for(let j=0;j<lugares.length;j++){
                if(sitiosTemp[i]==lugares[j].id){
                    lugares[j].classList.toggle("dot-chosen")
                }
            }
        }
    }

    function limpiarHTML(nodo){
        while(nodo.firstChild){
            nodo.removeChild(nodo.firstChild)
        }
    }

})()
window.onload = function () {
    
    let $lista = document.querySelector('#lista');
    let $btnAgregar = document.querySelector('#btnAgregar');
    let $entrada = document.querySelector('#entrada');

    getFunc();

    function getFunc () {
        document.getElementById("btnAgregar").textContent = "Agregar";

        fetch('http://127.0.0.1:8000/cards/')
        .then(function(response) { return response.json() })
        .then(function(data) {
            console.log(data);
            console.log(data[0].id);
            console.log(data[0].texto);
            console.log(JSON.stringify(data));            

            data.forEach(element => {
                let nuevo = document.createElement('div');
                let textoEntrada = element.texto;
                let ind = textoEntrada.indexOf(":");
                let tipo = textoEntrada.substr(0, ind);
                let texto = textoEntrada.substr(ind+1, textoEntrada.lenght);
                console.log(tipo);
                console.log(texto);
    
                nuevo.classList.add('list-group-alert', 'alert-'+tipo, element.id);
                nuevo.textContent = texto;
                nuevo.style.height = "50px";
                nuevo.style.borderRadius = "5px";
                nuevo.style.marginBottom = "20px";
                nuevo.style.paddingLeft = "20px";
                nuevo.style.paddingTop = "10px";
                nuevo.id = element.id;
                $lista.appendChild(nuevo);
        
                let btnRemover = document.createElement('button');
                btnRemover.classList.add('btn', 'btn-danger');
                btnRemover.textContent = 'X';
                btnRemover.style.marginLeft = '10px';
        
                let btnEditar = document.createElement('button');
                btnEditar.classList.add('btn', 'btn-warning');
                btnEditar.textContent = 'Editar';
                btnEditar.style.marginLeft = '10px';
        
                btnRemover.addEventListener('click', function(){
                    nuevo.outerHTML = "";
                    deleteFunc(nuevo.id);
                });
        
                btnEditar.addEventListener('click', function(){
                    $entrada.value = textoEntrada;
                    document.getElementById("btnAgregar").textContent = "Editar";
                    nuevo.outerHTML = "";
                    deleteFunc(nuevo.id);
                    //putFunc(nuevo.id);
                });
                
                nuevo.appendChild(btnEditar);
                nuevo.appendChild(btnRemover);
            })

        })
    }

    function postFunc () {
        
        let nuevo = document.createElement('div');
        let textoEntrada = $entrada.value;
        let ind = textoEntrada.indexOf(":");
        let tipo = textoEntrada.substr(0, ind);
        let texto = textoEntrada.substr(ind+1, textoEntrada.lenght);

        let payload = {
            texto:textoEntrada
        };

        var dataCard = JSON.stringify( payload )
        
        fetch('http://127.0.0.1:8000/cards/', {
            method: 'POST',
            mode: 'cors',
            headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
            },
            body: dataCard
        })
        .then(function(response) { return response.json() })
        .then(function(data) {
            console.log(data);
            console.log(JSON.stringify(data));
            console.log(JSON.stringify(data)[6] + JSON.stringify(data)[7]);
            console.log(data.id);

            nuevo.classList.add('list-group-alert', 'alert-'+tipo, data.id);
            nuevo.textContent = texto;
            nuevo.style.height = "50px";
            nuevo.style.borderRadius = "5px";
            nuevo.style.marginBottom = "20px";
            nuevo.style.paddingLeft = "20px";
            nuevo.style.paddingTop = "10px";
            nuevo.id = data.id;
            $lista.appendChild(nuevo);

            let btnRemover = document.createElement('button');
            btnRemover.classList.add('btn', 'btn-danger');
            btnRemover.textContent = 'X';
            btnRemover.style.marginLeft = '10px';

            let btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-warning');
            btnEditar.textContent = 'Editar';
            btnEditar.style.marginLeft = '10px';

            btnRemover.addEventListener('click', function(){
                nuevo.outerHTML = "";
                deleteFunc(nuevo.id);
            });

            btnEditar.addEventListener('click', function(){
                $entrada.value = textoEntrada;
                document.getElementById("btnAgregar").textContent = "Editar";
                nuevo.outerHTML = "";
                deleteFunc(nuevo.id);
                //putFunc(nuevo.id);
            });
            
            nuevo.appendChild(btnEditar);
            nuevo.appendChild(btnRemover);

            document.getElementById("btnAgregar").textContent = "Agregar";                
        })
    
    }

    function deleteFunc (idCard) {
        fetch('http://127.0.0.1:8000/cards/'+idCard, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
            },
        })
    }

    function putFunc(idCard) {
        let textoEntrada = $entrada.value;
        let payload = {
            texto:textoEntrada
        };

        var dataCard = JSON.stringify( payload )
        
        fetch('http://127.0.0.1:8000/cards/' + idCard, {
            method: 'PUT',
            mode: 'cors',
            headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
            },
            body: dataCard
        })
    }

    $btnAgregar.addEventListener('click', postFunc);
}
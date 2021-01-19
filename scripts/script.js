window.onload = function () {
    
    let $lista = document.querySelector('#lista');
    let $btnAgregar = document.querySelector('#btnAgregar');
    let $entrada = document.querySelector('#entrada');
    let $contID = 0;


    function postFunc (textoEntrada) {
        let payload = {
            texto:textoEntrada
        };
        console.log(JSON.stringify( payload ));
        var data = JSON.stringify( payload )
        //data.append( "json", JSON.stringify( payload ) );
        
        fetch('http://127.0.0.1:8000/cards/', {
            method: 'POST',
            mode: 'cors',
            headers: {
               'Accept': 'application/json, text/plain, */*',
               'Content-Type': 'application/json'
            },
            body: data
        })
    }

    function agregarCard () {

        let nuevo = document.createElement('div');
        let textoEntrada = $entrada.value;
        let ind = textoEntrada.indexOf(":");
        let tipo = textoEntrada.substr(0, ind);
        let texto = textoEntrada.substr(ind+1, textoEntrada.lenght);

        postFunc(textoEntrada);
        
        nuevo.classList.add('list-group-alert', 'alert-'+tipo, $contID);
        nuevo.textContent = texto;
        nuevo.style.height = "50px";
        nuevo.style.borderRadius = "5px";
        nuevo.style.marginBottom = "20px";
        nuevo.style.paddingLeft = "20px";
        nuevo.style.paddingTop = "10px";
        nuevo.id = $contID;
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
        });

        btnEditar.addEventListener('click', function(){
            $entrada.value = textoEntrada;
            document.getElementById("btnAgregar").textContent = "Editar";
        });
        
        nuevo.appendChild(btnEditar);
        nuevo.appendChild(btnRemover);
        $contID++;
    }



    $btnAgregar.addEventListener('click', agregarCard);

}
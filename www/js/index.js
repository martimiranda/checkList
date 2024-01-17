/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    refreshTasks();
    //guardarLI();
    //mostrarLI();
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    
    $('#homePage').on('click', '.borrar', function() {
        var elementoLi = $(this).closest('li');
        elementoLi.remove();
        var id = elementoLi.attr('id');
        var arrayDades = localStorage.getItem('dades').split(',');
        var numero = parseInt(id.replace(/\D/g, ''), 10);
        arrayDades.splice(numero-1, numero-1);
        localStorage.setItem('dades',arrayDades);
        $('#homePage ul[data-role="listview"]').listview('refresh');
    });
    
    $("#boto1").on("click", function() {
    var task = prompt("What task you want to add?");

        // Coloca aquí el código que deseas ejecutar cuando se hace clic en el botón
        
    var newListItem = $('<li><a href="#"><button class="borrar">Borrar</button> <button class="editar">Editar</button><input class="escritura" style="display:none;"></input><button class="aceptar" style="display:none;">Aceptar</button>'+task+'</a></li>');
    var arrayDades = localStorage.getItem('dades').split(',');
    arrayDades.push(task);
    localStorage.setItem('dades',arrayDades);



    // Agregar el nuevo elemento al listview
    $('#homePage ul[data-role="listview"]').append(newListItem);

    // Refrescar el diseño de jQuery Mobile después de agregar el nuevo elemento
    $('#homePage ul[data-role="listview"]').listview('refresh');

    });
    
    $('#homePage').on('click', '.editar', function() {
        var elementoLi = $(this).closest('li');
        var elementoDentroLi = elementoLi.find('.escritura');
        var elementoDentroLi2 = elementoLi.find('.aceptar');
        elementoDentroLi.css('display', 'block');
        elementoDentroLi2.css('display', 'block');
    });
    $('#homePage').on('click', '.aceptar', function() {
        var elementoLi = $(this).closest('li');
        var text = elementoLi.find('.escritura').val();
        var id = elementoLi.attr('id');
        elementoLi.find('a').contents().last()[0].nodeValue = text;
        elementoLi.find('.escritura').css('display', 'none');
        elementoLi.find('.aceptar').css('display', 'none');
        var arrayDades = localStorage.getItem('dades').split(',');
        var numero = parseInt(id.replace(/\D/g, ''), 10);
       // console.log(numero);
        arrayDades[numero-1]=text;
        localStorage.setItem('dades',arrayDades);

console.log(miArray);

    });
}
function guardarLI(){
    var tasks = $('#tasks li').outerHTML.toArray();
    console.log(tasks);
    localStorage.setItem('dades',JSON.stringify(tasks));
}
function LI(){
    var tasks = JSON.parse(localStorage.getItem('dades'));
    for(task of tasks){
        $('#task').append(task);
    }
}

function refreshTasks(){
    var arrayDades = localStorage.getItem('dades').split(',');
    var i =0;
    for(dada of arrayDades){
        i++;
        console.log(dada);
        var newListItem = $('<li><a href="#"><button class="borrar">Borrar</button> <button class="editar">Editar</button><input class="escritura" style="display:none;"></input><button class="aceptar" style="display:none;">Aceptar</button>'+dada+'</a></li>');
        newListItem.attr('id', 'task' + i);
        // Agregar el nuevo elemento al listview
        $('#homePage ul[data-role="listview"]').append(newListItem);
    }
    // Refrescar el diseño de jQuery Mobile después de agregar el nuevo elemento
    $('#homePage ul[data-role="listview"]').listview('refresh');
}

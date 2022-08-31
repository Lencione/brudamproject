(() => {
    document.addEventListener("DOMContentLoaded", (e) => {
        $("#shipping_value").inputmask('currency', {
            autoUnmask: true,
            radixPoint: ",",
            groupSeparator: ".",
            allowMinus: false,
            prefix: 'R$ ',
            digits: 2,
            digitsOptional: false,
            rightAlign: false,
            unmaskAsNumber: true,
            removeMaskOnSubmit: true
        });

        function populateTable(url = route('api.order.getAll')) {
            let table = document.querySelector('#table>tbody');
            table.innerHTML = "";

            axios.get(url).then((response) => {
                orders = response.data;
                orders.data.forEach(order => {
                    let tr = document.createElement('tr');
                    let date = new Date(order.delivery_date);
                    tr.innerHTML =
                        `<tr>
                        <td>${order.id}</td>
                        <td>${date.toLocaleDateString("pt-BR")}</td>
                        <td>R$ ${(order.shipping_value / 100).toFixed(2)}</td>
                        <td>${order.client.name}</td>
                    </tr>`;
                    table.appendChild(tr);
                });
                let pagination = document.querySelector('#pagination');
                pagination.innerHTML = '';
                orders.links.forEach((link, key) => {
                    let newLi = document.createElement('li');
                    newLi.classList.add('page-item');


                    newLi.innerHTML = `<button class="page-link">${link.label}</button>`;

                    if (key == 0) {
                        newLi.innerHTML = `<button class="page-link">&laquo; Anterior</button>`;
                    }
                    if (key == (orders.links.length - 1)) {
                        newLi.innerHTML = `<button class="page-link">Próximo &raquo;</button>`;
                    }

                    if (link.active == true) {
                        newLi.classList.add('disabled');
                    }

                    if (orders.current_page == 1) {
                        if (key == 0) {
                            newLi.classList.add('disabled');
                            newLi.innerHTML =
                                `<button class="page-link">&laquo; Anterior</button>`;
                        }
                    }
                    if (orders.current_page == orders.last_page) {
                        if (key == (orders.links.length - 1)) {
                            newLi.classList.add('disabled');
                            newLi.innerHTML =
                                `<button class="page-link">Próximo &raquo;</button>`;
                        }
                    }

                    newLi.querySelector('button').addEventListener('click', (e) => {
                        e.preventDefault();
                        populateTable(link.url);
                    });
                    pagination.appendChild(newLi);
                });
            }).catch((error) => {
                console.log(error);
            });
        }

        let formCreateOrder = document.querySelector('#form-createOrder');
        formCreateOrder.addEventListener('submit', (event) => {
            event.preventDefault();
            axios.post(route('api.order.store'),
                {
                    //shipping_value * 100 para salvar no banco como inteiro
                    //Segundo: Fowler, Martin. Patterns of Enterprise Application Architecture.
                    shipping_value: $('#shipping_value').inputmask('unmaskedvalue') * 100,
                    delivery_date: formCreateOrder.querySelector('#delivery_date').value,
                    client_id: formCreateOrder.querySelector('#client_id').value,
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then((response) => {
                    Swal.fire('Sucesso', response.data.message, 'success');
                    populateTable();
                }).catch((error) => {
                    Swal.fire('Erro', error.response.data, 'error');
                });
        });
        populateTable();
    });
})();
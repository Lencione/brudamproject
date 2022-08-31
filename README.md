# Projeto criado para processo seletivo BRUDAM.

### Descrição
    O projeto foi criado em apenas uma página para facilitar os testes.
    Desenvolvido para criar pedidos e exibi-los em seguida utilizando relacionamentos.
    Para ir direto ao ponto, foi utilizado factories para a criação de **usuários (id, name)** de maneira simples.
    Os pedidos (orders) foram serão criados mediante ao envio de uma requisição **POST** para a rota **api.order.store**, enviando os dados setados pelo usuário em formato **JSON** da seguinte forma (valores somente para exemplo):
    
    ```json
    {
        shipping_value: 100,
        delivery_date: 31/08/2022,
        client_id: 1
    }
    ```

    Todos os dados passam por uma validação utilizando **FormRequest**, chamada de **OrderRequest**.
    Após o envio do formulário em uma requisição de verbo **POST** na rota **api.order.store**, com os dados devidamente validados, o mesmo é inserido no banco de dados.

    A tabela exibida na página é populada dinâmicamente com os dados recebidos de uma requisição de verbo **GET** na rota **api.order.getAll**.
    Após cada inserção a tabela é renderizada novamente com os dados atualizados.

    Os dados recebidos pela rota estão no formato (valores somente para exemplo): 
    ```json
    {
        "id": 1,
        "delivery_date": "2023-02-01 00:00:00",
        "shipping_value": 100,
        "client_id": 1,
        "created_at": "2022-08-31T13:25:18.000000Z",
        "updated_at": "2022-08-31T13:25:18.000000Z",
        "client": {
               "id": 12,
            "name": "Wyatt Pouros"
        }
    }
    ```
    Onde os dados de **client** estão vindo de um relacionamento **(belongsTo)** da tabela orders.

### Primeiro passo - Configuração do ambiente: 
    • Criar e configurar o arquivo **.env** conforme segue .env.example
    • Criar banco de dados chamado ***brudamproject***
    • executar os seguintes comandos no console dentro da pasta do projeto:
        - php artisan migrate
        - php artisan db:seed

### Segundo passo - Testes:
    • Inserir os dados no formulário e clicar em enviar.
    • A confirmação da inserção de dados deverá ser retornada em uma mensagem na tela.
    • Após inserção do pedido, a tabela será automaticamente populada com o novo registro.

### Bibliotecas e ferramentas utilizadas para desenvolvimento.
    • Laravel 9x
    • Jquery 3.6.1 (Somente para máscara)
    • Jquery inputmask
    • Fontawesome
    • Bootstrap 5.2
    • Axios
    • Sweet Alert 2
    • MySQL
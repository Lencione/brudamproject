@extends('layouts.app')

@section('content')
    <div class="container mt-5">
        <div class="row">
            <div class="col">
                <x-card title="Gerenciamento de pedidos">
                    <div class="row">
                        <div class="col">
                            <x-card title="Criar novo pedido">
                                <form id="form-createOrder">
                                    <div class="mb-3">
                                        <label for="shipping_value" class="form-label">Valor do frete</label>
                                        <input name="shipping_value" type="text" class="form-control" id="shipping_value" placeholder="R$ 0,00" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="delivery_date" class="form-label">Data da entrega</label>
                                        <input name="delivery_date" type="date" class="form-control" id="delivery_date" required value={{ today() }}>
                                    </div>
                                    <div class="mb-3">
                                        <label for="client_id" class="form-label">Cliente</label>
                                        <select class="form-control" name="client_id" id="client_id" required>
                                            <option disabled selected>Selecione o cliente</option>
                                            @foreach ($clients as $client)
                                                <option value="{{ $client->id }}">{{ $client->id.' - '.$client->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <button class="btn btn-light" type="submit"><i class="fa fa-fw fa-save text-success"></i> Enviar</button>
                                        <button class="btn btn-light" type="reset"><i class="fa fa-fw fa-eraser text-danger"></i> Limpar</button>
                                    </div>
                                </form>
                            </x-card>
                        </div>
                        <div class="col">
                            <x-card title="Exibição de pedidos">
                                <table class="table table-sm" id="table">
                                    <thead>
                                        <th>#</th>
                                        <th>Data de entrega</th>
                                        <th>Valor do frete</th>
                                        <th>Cliente</th>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                @slot('footer')
                                    <nav>
                                        <ul class="pagination" id="pagination">
                                        </ul>
                                    </nav>
                                @endslot
                            </x-card>
                            
                        </div>
                    </div>
                </x-card>
            </div>
        </div>
    </div>
@endsection

<div class="card my-3">
    <div class="card-body">
        <form id="car-filters" class="d-flex flex-wrap gap-2">

            <input type="text" name="brand" class="form-control" placeholder="Marca">

            <input type="text" name="line" class="form-control" placeholder="Línea">

            <x-organisms.select-color class="form-control" />

            <input type="number" name="model" class="form-control" placeholder="Modelo">

            <input type="number" name="min_price" class="form-control" placeholder="Precio mín">

            <input type="number" name="max_price" class="form-control" placeholder="Precio máx">

            <button class="btn btn-primary">
                Buscar
            </button>

            <button type="button" id="clear-filters" class="btn btn-outline-secondary">
                Limpiar
            </button>

        </form>
    </div>
</div>

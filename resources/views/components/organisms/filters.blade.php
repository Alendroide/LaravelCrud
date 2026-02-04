<div class="card my-3">
    <div class="card-body">
        <form id="car-filters" class="d-flex flex-wrap gap-2">

            <input type="text" name="brand" class="form-control" placeholder="Marca">

            <input type="text" name="line" class="form-control" placeholder="Línea">

            <x-organisms.select-color class="form-control" />

            <input type="number" name="model" class="form-control" placeholder="Modelo">

            <input type="number" name="min_price" class="form-control" placeholder="Precio mín">

            <input type="number" name="max_price" class="form-control" placeholder="Precio máx">

            <button class="btn btn-outline-primary d-flex justify-content-center align-items-center">
                <x-icons.search />
                Buscar
            </button>

            <button type="button" id="clear-filters" class="btn btn-outline-danger d-flex justify-content-center align-items-center">
                <x-icons.trash />
                Limpiar
            </button>

            <button type="button" id="download-excel" class="btn btn-outline-success d-flex justify-content-center align-items-center">
                <x-icons.excel />
                Excel
            </button>

        </form>
    </div>
</div>

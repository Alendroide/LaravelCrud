<x-organisms.modal id="update-car-modal" title="Editar auto">
    <form id="update-car-form" style="display: flex; flex-direction: column; gap: 1rem;">
        @csrf
        <input type="hidden" name="_method" value="PUT">
        <input type="hidden" name="id" />

        <x-atoms.custom-input name="brand"  placeholder="Marca" required />
        <x-atoms.custom-input name="line"   placeholder="Linea" required />
        <x-atoms.custom-input name="model"  placeholder="Modelo" required />
        <x-atoms.custom-input name="plate"  placeholder="Placa" required />
        <x-atoms.custom-input name="color"  placeholder="Color" required />

        <input
            type="file"
            id="update-photos-input"
            name="photos[]"
            multiple
            accept="image/png,image/jpeg,image/webp"
        />
        <div id="update-photo-previews" class="photo-previews"></div>
        <div id="deleted-photos-container"></div>

        <div>
            <x-atoms.custom-button type="submit" color="success-button">
                Guardar vehiculo
            </x-atoms.custom-button>
        </div>
    </form>
</x-organisms.modal>
<script src="{{ asset("/js/cars/components/update-car-logic.js") }}"></script>
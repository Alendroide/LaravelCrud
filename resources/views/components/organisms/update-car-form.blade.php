<x-organisms.modal id="update-car-modal" title="Editar auto">
    <form id="update-car-form" style="display: flex; flex-direction: column; gap: 1rem;">
        @csrf
        <input type="hidden" name="_method" value="PUT">
        <input type="hidden" name="id" />

        <x-atoms.custom-input type="text" minLength="3" maxLength="15" name="brand"  placeholder="Marca" required />
        <x-atoms.custom-input type="text" maxLength="15" name="line"   placeholder="Linea" required />
        <x-atoms.custom-input type="number" min="1980" max="2026" name="model"  placeholder="Modelo" required />
        <x-atoms.custom-input type="text" minLength="6" maxLength="8" name="plate" placeholder="Placa" required />
        <x-organisms.select-color class="custom-input" required/>
        
        <input type="text" class="custom-input visual-price" placeholder="Precio" required />
        <input type="hidden" name="price" class="real-price" />

        <input
            type="number"
            class="custom-input visual-tax"
            placeholder="Impuesto (%)"
            min="0"
            max="100"
            step="0.01"
            required
        />
        <input type="hidden" name="tax" class="real-tax" />

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
            <x-atoms.custom-button id="update-car-button" type="submit" color="success-button">
                Guardar vehiculo
            </x-atoms.custom-button>
        </div>
    </form>
</x-organisms.modal>
<script src="{{ asset("js/components/update-car-logic.js") }}"></script>
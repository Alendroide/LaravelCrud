<x-organisms.modal id="upload-car-modal" title="Sube tu auto">
    <form id="create-car-form" style="display: flex; flex-direction: column; gap: 1rem;">
        @csrf
        <x-atoms.custom-input type="text" minLength="3" maxLength="15" name="brand" placeholder="Marca" required />
        <x-atoms.custom-input type="text" maxLength="15" name="line" placeholder="Linea" required />
        <x-atoms.custom-input type="number" min="1980" max="2026" name="model" placeholder="Modelo" required />
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

        <input id="photos-input" type="file" name="photos[]" multiple accept="image/png,image/jpeg,image/webp" max="7" />
        <div
            id="photo-previews"
            class="photo-previews"
            style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;"
        ></div>
        <div>
            <x-atoms.custom-button id="save-car-button" type="submit" color="success-button">
                Guardar vehiculo
            </x-atoms.custom-button>
        </div>
    </form>
    <script src="{{ asset("js/components/create-car-logic.js") }}"></script>
</x-organisms.modal>
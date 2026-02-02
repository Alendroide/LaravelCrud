<x-organisms.modal id="edit-car-modal" title="Editar auto">
    <form id="edit-car-form" style="display: flex; flex-direction: column; gap: 1rem;">

        <input type="hidden" name="id" />

        <x-atoms.custom-input type="text" maxLength="255" id="update-brand" name="brand" placeholder="Marca" required />
        <x-atoms.custom-input type="text" maxLength="255" id="update-line" name="line" placeholder="Linea" required />
        <x-atoms.custom-input type="number" min="1980" id="update-model" max="2026" name="model" placeholder="Modelo" required />
        <x-atoms.custom-input type="text" minLength="6" id="update-plate" maxLength="8" name="plate" placeholder="Placa" required />
        <x-atoms.custom-input type="text" maxLength="255" id="update-color" name="color" placeholder="Color" required />

        <div>
            <x-atoms.custom-button type="submit" color="success-button">
                Guardar cambios
            </x-atoms.custom-button>
        </div>
    </form>
</x-organisms.modal>

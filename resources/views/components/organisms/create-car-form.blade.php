<x-organisms.modal id="upload-car-modal" title="Sube tu auto">
    <form id="create-car-form" style="display: flex; flex-direction: column; gap: 1rem;">
        @csrf
        <x-atoms.custom-input type="text" maxLength="255" name="brand" placeholder="Marca" required />
        <x-atoms.custom-input type="text" maxLength="255" name="line" placeholder="Linea" required />
        <x-atoms.custom-input type="number" min="1980" max="2026" name="model" placeholder="Modelo" required />
        <x-atoms.custom-input type="text" minLength="6" maxLength="8" name="plate" placeholder="Placa" required />
        <x-atoms.custom-input type="text" maxLength="255" name="color" placeholder="Color" required />
        <input id="photos-input" type="file" name="photos[]" multiple accept="image/png,image/jpeg" max="7" />
        <div
            id="photo-previews"
            class="photo-previews"
            style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;"
        ></div>
        <div>
            <x-atoms.custom-button type="submit" color="success-button">
                Guardar vehiculo
            </x-atoms.custom-button>
        </div>
    </form>
    <script>
        $(function () {
            const MAX_FILES = 7;
            const $input = $('#photos-input');
            const $previews = $('#photo-previews');

            let files = [];

            $input.on('change', function (e) {
                const selected = Array.from(this.files);

                if (files.length + selected.length > MAX_FILES) {
                    alert(`Máximo ${MAX_FILES} fotos.`);
                    $input.val('');
                    return;
                }

                selected.forEach(file => {
                    files.push(file);
                    renderPreview(file);
                });

                syncFiles();
            });

            function renderPreview(file) {
                const reader = new FileReader();

                reader.onload = e => {
                    const $preview = $(`
                        <div class="photo-preview">
                            <img src="${e.target.result}">
                            <button type="button">&times;</button>
                        </div>
                    `);

                    $preview.find('button').on('click', () => {
                        files = files.filter(f => f !== file);
                        $preview.remove();
                        syncFiles();
                    });

                    $previews.append($preview);
                };

                reader.readAsDataURL(file);
            }

            function syncFiles() {
                const dt = new DataTransfer();
                files.forEach(file => dt.items.add(file));
                $input[0].files = dt.files;
            }
        });
    </script>
</x-organisms.modal>
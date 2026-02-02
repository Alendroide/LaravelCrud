$(document).ready(function () {
    const MAX_FILES = 7;

    const $input     = $('#update-photos-input');
    const $previews  = $('#update-photo-previews');
    const $deleted   = $('#deleted-photos-container');

    let existingPhotos = [];
    let newFiles = [];

    window.loadUpdateCarPhotos = function (photos) {
        existingPhotos = [...photos];
        newFiles = [];

        $previews.empty();
        $deleted.empty();
        $input.val('');

        photos.forEach(path => renderExistingPhoto(path));
    };

    function renderExistingPhoto(path) {
        const $preview = $(`
            <div class="photo-preview" data-path="${path}">
                <img src="/storage/${path}">
                <button type="button">&times;</button>
            </div>
        `);

        $preview.find('button').on('click', () => {
            existingPhotos = existingPhotos.filter(p => p !== path);
            
            $deleted.append(
                `<input type="hidden" name="deleted_photos[]" value="${path}">`
            );

            $preview.remove();
        });

        $previews.append($preview);
    }

    $input.on('change', function () {
        const selected = Array.from(this.files);

        if (existingPhotos.length + newFiles.length + selected.length > MAX_FILES) {
            alert(`Máximo ${MAX_FILES} fotos en total.`);
            $input.val('');
            return;
        }

        selected.forEach(file => {
            newFiles.push(file);
            renderNewPhoto(file);
        });

        syncInputFiles();
    });

    function renderNewPhoto(file) {
        const reader = new FileReader();

        reader.onload = e => {
            const $preview = $(`
                <div class="photo-preview">
                    <img src="${e.target.result}">
                    <button type="button">&times;</button>
                </div>
            `);

            $preview.find('button').on('click', () => {
                newFiles = newFiles.filter(f => f !== file);
                $preview.remove();
                syncInputFiles();
            });

            $previews.append($preview);
        };

        reader.readAsDataURL(file);
    }

    function syncInputFiles() {
        const dt = new DataTransfer();
        newFiles.forEach(f => dt.items.add(f));
        $input[0].files = dt.files;
    }
});
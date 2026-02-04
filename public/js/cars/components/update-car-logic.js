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
                <button type="button" class="remove-photo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </button>
            </div>
        `);

        $previews.append($preview);
    }

    $input.on('change', function () {
        const selected = Array.from(this.files);

        if (existingPhotos.length + newFiles.length + selected.length > MAX_FILES) {
            alert(`Máximo ${MAX_FILES} fotos en total.`);
            $input.val('');
            return;
        }

        selected.forEach(async file => {
            const compressed = await compressImage(file, 120, 1280);
            newFiles.push(compressed);
            renderNewPhoto(file);
            syncInputFiles();
        });

    });

    function renderNewPhoto(file) {
        const reader = new FileReader();

        reader.onload = e => {
            const $preview = $(`
                <div class="photo-preview">
                    <img src="${e.target.result}">
                    <button type="button" class="remove-photo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                        </svg>
                    </button>
                </div>
            `);

            $previews.append($preview);
        };

        reader.readAsDataURL(file);
    }

    $previews.on('click', '.remove-photo', function () {
        const $preview = $(this).closest('.photo-preview');
        const path = $preview.data('path');

        if (path) {
            existingPhotos = existingPhotos.filter(p => p !== path);

            $deleted.append(
                `<input type="hidden" name="deleted_photos[]" value="${path}">`
            );
        } else {
            const index = $preview.index();
            newFiles.splice(index - existingPhotos.length, 1);
            syncInputFiles();
        }

        $preview.remove();
    });

    function syncInputFiles() {
        const dt = new DataTransfer();
        newFiles.forEach(f => dt.items.add(f));
        $input[0].files = dt.files;
    }
});

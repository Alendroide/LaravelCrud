let photosFiles = [];

$(document).ready(function () {
    const MAX_FILES = 7;
    const $input = $('#photos-input');
    const $previews = $('#photo-previews');

    $input.on('change', function (e) {
        const selected = Array.from(this.files);

        if (photosFiles.length + selected.length > MAX_FILES) {
            alert(`Máximo ${MAX_FILES} fotos.`);
            $input.val('');
            return;
        }

        selected.forEach(file => {
            photosFiles.push(file);
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
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
            `);

            $preview.find('button').on('click', () => {
                photosFiles = photosFiles.filter(f => f !== file);
                $preview.remove();
                syncFiles();
            });

            $previews.append($preview);
        };

        reader.readAsDataURL(file);
    }

    function syncFiles() {
        const dt = new DataTransfer();
        photosFiles.forEach(file => dt.items.add(file));
        $input[0].files = dt.files;
    }
});
$(document).ready(function () {
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
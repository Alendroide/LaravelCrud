<div class="modal-overlay" id="{{ $id ?? 'modal' }}">
    <div class="modal">
        <div class="modal-header">
            <h3>{{ $title ?? 'Modal' }}</h3>
            <x-atoms.close-button style="margin-right: .5rem;" class="modal-close" />
        </div>

        <div class="modal-body">
            {{ $slot }}
        </div>
    </div>
</div>

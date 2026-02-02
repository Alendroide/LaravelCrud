<div class="modal-overlay" id="{{ $id ?? 'modal' }}">
    <div class="modal-box">
        <div class="modal-box-header">
            <h3>{{ $title ?? 'Modal' }}</h3>
            <x-icons.close style="margin-right: .5rem;" class="modal-close" />
        </div>

        <div class="modal-box-body">
            {{ $slot }}
        </div>
    </div>
</div>
<script src="{{ asset("/js/components/modal.js") }}"></script>

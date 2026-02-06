<div id="sidebar">
    <a style="margin: 2rem 0;" href="{{ route('dashboard') }}">
        <img src="{{ asset('img/logo.png') }}" id="sidebar-logo" alt="sidebar-logo">
    </a>
    <a href="{{ route("dashboard") }}" class="sidebar-item {{ request()->routeIs('dashboard') ? 'active' : '' }}">Inicio</a>
    <a href="{{ route("my-vehicles") }}" class="sidebar-item {{ request()->routeIs('my-vehicles') ? 'active' : '' }}">Mis vehículos</a>
    <a href="{{ route("my-archives") }}" class="sidebar-item {{ request()->routeIs('my-archives') ? 'active' : '' }}">Archivo</a>
    <a href="{{ route("bought-cars") }}" class="sidebar-item {{ request()->routeIs('bought-cars') ? 'active' : '' }}">Mis compras</a>
</div>
<div id="navbar">
    <img id="navbar-logo" src="{{ asset("/img/logo.png") }}" alt="logo">
    <x-icons.menu id="sidebar-toggle" />
    <p id="welcome-text">Bienvenido, {{auth()->user()->name}}</p>
    <a id="logout-icon" href="{{ route('logout') }}">
        <x-icons.logout />
    </a>
</div>
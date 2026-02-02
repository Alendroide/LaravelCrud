<div id="navbar">
    <x-icons.menu id="sidebar-toggle" />
    <p style="margin-left: auto; margin-right: 1rem; font-weight: 700;">Bienvenido, {{auth()->user()->name}}</p>
    <a style=" margin-right: 1rem; color: white;" href="{{ route('logout') }}">
        <x-icons.logout />
    </a>
</div>
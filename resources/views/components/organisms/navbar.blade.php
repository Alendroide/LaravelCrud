<div id="navbar">
    <img id="navbar-logo" src="{{ asset("/img/logo.png") }}" alt="logo">
    <x-icons.menu id="sidebar-toggle" />
    <div id="navbar-right">
        <p id="welcome-text" class="navbar-right-item">Bienvenido, {{auth()->user()->name}}</p>
        <a id="cart-icon" class="navbar-right-item {{ request()->routeIs('cart') ? 'active-cart' : '' }}" href="{{ route("cart") }}">
            <span class="total-cart-quantity">0</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </a>
        <a id="logout-icon" class="navbar-right-item" href="{{ route('logout') }}">
            <x-icons.logout />
        </a>
    </div>
</div>
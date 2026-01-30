<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CRUD | {{ $pageTitle }}</title>
    <script src="{{ asset('/js/jquery-4.0.0.min.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('/css/global.css') }}">
</head>
<body>
    <div id="sidebar">
        <img src="{{ asset('img/logo.png') }}" id="sidebar-logo" alt="sidebar-logo">
        <p class="sidebar-item">Usuarios</p>
        <p class="sidebar-item">Info</p>
    </div>
    <div id="content">
        @yield('content')
    </div>
</body>
</html>
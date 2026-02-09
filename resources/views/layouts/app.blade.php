<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $pageTitle }} | AutoHub</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    
    <!-- JQUERY -->
    <script src="{{ asset('js/lib/jquery-4.0.0.min.js') }}"></script>
    <script src="{{ asset('js/lib/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('js/lib/messages_es.min.js') }}"></script>
    
    <!-- BOOTSTRAP -->
    <script src="{{ asset("js/lib/bootstrap.bundle.min.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("css/lib/bootstrap.min.css") }}">

    <!-- AUTH USER ID -->
    <script>
        window.AUTH_USER_ID = {{ auth()->id() ?? 'null' }};
    </script>

    <!-- GLOBAL STYLES -->
    <link rel="stylesheet" href="{{ asset('css/global.css') }}">
    <link rel="stylesheet" href="{{ asset('css/cars/global.css') }}">

    <!-- GLOBAL SCRIPTS -->
    <script src="{{ asset("js/global.js") }}"></script>
    <script src="{{ asset("js/utils.js") }}"></script>
</head>
<body>
    <div id="toast-container"></div>
    <div id="sidebar-overlay"></div>
    <x-organisms.sidebar />
    <div id="page">
        <x-organisms.navbar />
        <div id="content">
            @yield('content')
        </div>
    </div>
</body>
</html>
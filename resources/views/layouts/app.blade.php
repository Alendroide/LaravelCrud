<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $pageTitle }} | AutoHub</title>
    <script src="{{ asset('/js/jquery-4.0.0.min.js') }}"></script>
    <script src="{{ asset('/js/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('/js/messages_es.min.js') }}"></script>
    <script>
        window.AUTH_USER_ID = {{ auth()->id() ?? 'null' }};
    </script>
    <link rel="stylesheet" href="{{ asset('/css/global.css') }}">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <!-- BOOTSTRAP -->
    <script src="{{ asset("/js/bootstrap.bundle.min.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/bootstrap.min.css") }}">
    <script src="{{ asset("/js/cars/utils.js") }}"></script>
</head>
<body>
    <div id="sidebar-overlay"></div>
    <x-organisms.sidebar />
    <div id="page">
        <x-organisms.navbar />
        <div id="content">
            @yield('content')
        </div>
    </div>
    <script src="{{ asset('/js/global.js') }}"></script>
</body>
</html>
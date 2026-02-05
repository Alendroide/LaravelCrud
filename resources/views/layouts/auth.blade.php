<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title') | AutoHub</title>
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <!-- JQUERY -->
    <script src="{{ asset('/js/lib/jquery-4.0.0.min.js') }}"></script>
    <script src="{{ asset('/js/lib/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('/js/lib/messages_es.min.js') }}"></script>

    <!-- BOOTSTRAP -->
    <script src="{{ asset("/js/lib/bootstrap.bundle.min.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/lib/bootstrap.min.css") }}">

    <link rel="stylesheet" href="/css/auth.css">
    <link rel="stylesheet" href="/css/global.css">
    <script src="{{ asset("/js/utils.js") }}"></script>
</head>
<body>
    <div id="toast-container"></div>
    @yield('content')
</body>
</html>
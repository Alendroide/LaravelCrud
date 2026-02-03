<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title') | AutoHub</title>
    <script src="{{ asset('/js/jquery-4.0.0.min.js') }}"></script>
    <script src="{{ asset('/js/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('/js/messages_es.min.js') }}"></script>
    <link rel="stylesheet" href="/css/auth.css">
    <link rel="stylesheet" href="/css/global.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <!-- BOOTSTRAP -->
    <script src="{{ asset("/js/bootstrap.bundle.min.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/bootstrap.min.css") }}">
</head>
<body>
    @yield('content')
</body>
</html>
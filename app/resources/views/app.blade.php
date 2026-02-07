@php
  $appName = config('app.name');
  $defaultTitle = $appName;
  $defaultDesc = '80歳まで40年間続けるサイトです。未経験からエンジニア正社員になるまで、不登校・ひきこもりから立ち直るまで。';
  $defaultUrl = url()->current();
  $defaultImage = asset('storage/images/common/ogimage.png');

  // ページ固有のメタ情報を取得（なければデフォルト値）
  $metaTitle = $page['props']['metaTitle'] ?? $defaultTitle;
  $metaDescription = $page['props']['metaDescription'] ?? $defaultDesc;
  $metaType = $page['props']['metaType'] ?? 'website';
@endphp

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @if (request()->routeIs('admin.*'))
            <meta name="robots" content="noindex,nofollow" />
        @endif


        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', '80歳まで続けるサイト') }}</title>
        <meta name="description" content="{{ $metaDescription }}">

        <link rel="canonical" href="{{ $defaultUrl }}">

        {{-- Open Graph (Facebook / LINE など) --}}
        <meta property="og:type" content="{{ $metaType }}">
        <meta property="og:site_name" content="{{ $appName }}">
        <meta property="og:locale" content="ja_JP">
        <meta property="og:title" content="{{ $metaTitle }}">
        <meta property="og:description" content="{{ $metaDescription }}">
        <meta property="og:url" content="{{ $defaultUrl }}">
        <meta property="og:image" content="{{ $defaultImage }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">

        {{-- X (Twitter) --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $metaTitle }}">
        <meta name="twitter:description" content="{{ $metaDescription }}">
        <meta name="twitter:image" content="{{ $defaultImage }}">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

        @if (!request()->routeIs('admin.*'))
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CPX0ZD20GR"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-CPX0ZD20GR');
        </script>
        @endif
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

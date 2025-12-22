<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Theme;
use App\Models\Content;

class HomeController extends Controller
{
    public function index(): Response
    {
        $themes = Theme::with([
            'contents' => function ($query) {
                $query->orderBy('sort_order');}
        ])
                ->orderBy('sort_order')
                ->get();


        return Inertia::render('contents/home/index', [
            'contentGroups' => $themes
        ]);
    }
}

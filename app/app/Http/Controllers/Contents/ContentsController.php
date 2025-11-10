<?php

namespace App\Http\Controllers\Contents;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contents\ContentRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Content;

class ContentsController extends Controller
{
    //
    public function index(): Response
    {
        return Inertia::render('contents/index', []);
    }

    public function create(): Response
    {
        return Inertia::render('contents/create', []);
    }

    public function store(ContentRequest $request): RedirectResponse
    {
        Content::create([
            'name' => $request->name,
        ]);
        return to_route('contents.index');
    }

    public function  edit(Request $request): Response
    {
        return Inertia::render('contents/edit', []);
    }
}

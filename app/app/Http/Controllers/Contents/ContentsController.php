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
        return Inertia::render('contents/index', [
            'contents' => Content::all(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('contents/create', []);
    }

    public function store(ContentRequest $request): RedirectResponse
    {
        Content::create($request->all());
        return to_route('contents.index');
    }

    public function  edit(Content $content): Response
    {
        return Inertia::render('contents/edit', [
            'content' => $content,
        ]);
    }

    public function update(ContentRequest $request, Content $content): RedirectResponse
    {
        $content->update($request->validated());
        return to_route('contents.index');
    }
}

<?php

namespace App\Models;

class Comic extends BaseArticle
{
    protected static ?string $url = '';

    protected $fillable = [
        'title',
        'sort_order',
        'content_id',
        'category_id',
        'body',
        'status',
        'published_at',
        'created_at',
        'updated_at',
        'id',
    ];

    public function sortScope(): string
    {
        if ($this->content->has_categories) {
            return 'category_id';
        } else {
            return 'content_id';
        }
    }

    protected function routeName(): string
    {
        return 'comics.show';
    }

    public function hasImages(): bool
    {
        return true;
    }

    public function viewPath(): string
    {
        return 'contents/comics/show';
    }
}

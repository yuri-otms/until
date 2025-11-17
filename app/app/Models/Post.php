<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Post extends Model
{
    use HasSortOrder;
    protected static ?string $sortScope = 'category_id';

    protected $fillable = [
        'title',
        'slug',
        'sort_order',
        'content_id',
        'category_id',
        'body',
    ];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


}

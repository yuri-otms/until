<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Category extends Model
{
    use HasSortOrder;
    protected static ?string $sortScope = 'content_id';

    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'content_id'
    ];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public static function getCategoriesByContent($contentId)
    {
        return Category::where('content_id', $contentId)
                        ->orderBy('sort_order')
                        ->get();
    }

    public static function getContentByCategory($categoryId)
    {
        $category = Category::find($categoryId);
        if (!$category) {
            return;
        }
        return $category->content_id;
    }
}

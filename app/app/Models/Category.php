<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Category extends Model
{
    use HasFactory;
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

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comics()
    {
        return $this->hasMany(Comic::class);
    }


    public static function getCategoriesByContent($contentId)
    {
        $content = Content::find($contentId);
        if ($content->has_categories) {
            $categories = Category::where('content_id', $contentId)
                        ->orderBy('sort_order')
                        ->get();
        } else {
            $categories = null;
        }
        return $categories;
    }

    public static function getContentByCategory($categoryId)
    {
        $category = Category::find($categoryId);
        if (!$category) {
            return;
        }
        $content = Content::find($category->content_id);
        return $content;
    }
}

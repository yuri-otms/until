<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Content extends Model
{
    use HasFactory;
    use HasSortOrder;

    public function sortScope(): string
    {
        return 'theme_id';
    }

    protected $fillable = [
        'name',
        'display_name',
        'slug',
        'url',
        'sort_order',
        'theme_id',
        'description',
        'type',
        'is_listed',
        'status',
        'has_categories'
    ];

    protected $casts = [
        'is_listed' => 'boolean',
        'has_categories' => 'boolean',
    ];

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public static function getContentsOrderByTheme()
    {
        return Content::query()
                    ->join('themes', 'contents.theme_id', '=', 'themes.id')
                    ->orderBy('themes.sort_order')
                    ->orderBy('contents.sort_order')
                    ->select('contents.*')
                    ->get();
    }
}

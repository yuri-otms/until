<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Trait\HasSortOrder;

class Content extends Model
{
    use HasSortOrder;
    protected static ?string $sortScope = 'theme_id';

    protected $fillable = [
        'name',
        'display_name',
        'slug',
        'sort_order',
        'theme_id',
        'description',
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected static ?string $sortScope = 'theme_id';

    protected $fillable = [
        'name',
    ];

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }
}

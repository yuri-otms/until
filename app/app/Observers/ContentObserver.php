<?php

namespace App\Observers;

use App\Models\Content;
use Illuminate\Support\Facades\Cache;

class ContentObserver
{
    protected const CACHE_KEY = 'admin_sidebar_contents';

    public function saved(Content $content): void
    {
        $this->forgetCache();
    }

    public function deleted(Content $content): void
    {
        $this->forgetCache();
    }

    public function forgetCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }
}

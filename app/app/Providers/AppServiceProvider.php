<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Content;
use App\Models\Post;
use App\Models\Comic;
use App\Policies\PostPolicy;
use App\Policies\ComicPolicy;
use App\Policies\ContentPolicy;
use App\Observers\ContentObserver;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Post::class => PostPolicy::class,
        Comic::class => ComicPolicy::class,
        Content::class => ContentPolicy::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Content::observe(ContentObserver::class);
    }
}

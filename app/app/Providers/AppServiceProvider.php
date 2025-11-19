<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Content;
use App\Models\Post;
use App\Policies\PostPolicy;
use App\Observers\ContentObserver;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        Post::class => PostPolicy::class,
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

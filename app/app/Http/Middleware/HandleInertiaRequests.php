<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Content;
use Illuminate\Support\Facades\Cache;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'adminSidebarContents' => $this->getAdminSidebarContents(),
        ];
    }

    protected function getAdminSidebarContents()
    {
        $contents = Content::getContentsOrderByTheme();
        $adminSidebarContents = [];
        if ($contents) {
            foreach ($contents as $content) {
                $adminSidebarContents[] = [
                    'title' => $content->name,
                    'href' => "/admin/{$content->type}s/?content=" . $content->slug,
                    'icon' => '',
                ];
            }
        }
        return Cache::remember('admin_sidebar_contents', 3600, function () use ($adminSidebarContents) {
            return $adminSidebarContents;
        });
    }
}

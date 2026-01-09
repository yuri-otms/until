<?php

namespace Tests\Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Theme;
use App\Models\Content;
use Inertia\Testing\AssertableInertia as Assert;

class ContentTest extends TestCase
{
    use RefreshDatabase;

    public function test_content_page_can_be_rendered(): void
    {
        $user = User::factory()->create();
        $response = $this
            ->actingAs($user)
            ->get(route('admin.contents.index'));

        $response->assertStatus(200);
    }

    public function test_content_create_can_be_rendered() : void
    {
        $user = User::factory()->create();
        $response = $this
            ->actingAs($user)
            ->get(route('admin.contents.create'));

        $response->assertStatus(200);
    }

    public function test_content_can_be_stored(): void
    {
        $user = User::factory()->create();
        $theme = Theme::factory()->create();
        $payload = [
            'name' => 'テストコンテンツ',
            'slug' => 'test-content',
            'theme_id' => $theme->id,
            'type' => 'post',
            'status' => 'published',
            'description' => '説明文'
        ];

        $this
            ->actingAs($user)
            ->post(route('admin.contents.store', absolute: false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('contents', [
            'slug' => 'test-content',
            'status' => 'published',
        ]);
    }

    public function test_draft_content_is_not_listed_on_homepage(): void
    {
        $theme = Theme::factory()->create(['status' => 'published']);
        $publishedContent = Content::factory()->create(['status' => 'published', 'theme_id' => $theme->id]);
        $draftContent = Content::factory()->create(['status' => 'draft', 'theme_id' => $theme->id]);

        $this
            ->get(route('home', absolute: false))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('contents/home/index')
                ->where('contentGroups', function ($groups) use ($publishedContent, $draftContent) {
                    $allContentIds = collect($groups)
                        ->flatMap(fn ($theme) => $theme['contents'] ?? [])
                        ->pluck('id')
                        ->all();
                    return in_array($publishedContent->id, $allContentIds, true) && !in_array($draftContent->id, $allContentIds);
                })
            );
    }

    public function test_draft_content_is_not_showed(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['status' => 'draft']);

        $this
            ->get(route('contents.show', ['content' => $content->slug], false))
            ->assertStatus(404);
        $this
            ->actingAs($user)
            ->get(route('contents.show', ['content' => $content->slug], false))
            ->assertStatus(200);
    }

    public function test_content_is_not_listed_on_homepage_when_is_listed_is_false(): void
    {
        $content = Content::factory()->create(['is_listed' => false, 'status' => 'published']);
        $this
            ->get(route('home', absolute: false))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('contents/home/index')
                ->where('contentGroups', function ($groups) use ($content) {
                    $allContentIds = collect($groups)
                        ->flatMap(fn ($theme) => $theme['contents'] ?? [])
                        ->pluck('id')
                        ->all();
                    return ! in_array($content->id, $allContentIds, true);
                })
            );
    }

    public function test_content_page_can_be_rendered_when_is_listed_is_false(): void
    {
        $content = Content::factory()->create(['is_listed' => false, 'status' => 'published']);
        $this
            ->get(route('contents.show', ['content' => $content->slug], false))
            ->assertStatus(200);
    }

}

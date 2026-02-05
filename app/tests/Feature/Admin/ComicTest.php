<?php

namespace Tests\Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Content;
use App\Models\Category;
use App\Models\Comic;
use Carbon\Carbon;

class ComicTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_comic_can_be_stored_with_published_at(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => true]);
        $category = Category::factory()->create(['content_id' => $content->id]);
        $publishedAt = Carbon::parse('2026-03-01 10:30:00');
        
        $payload = [
            'title' => '公開日指定コミック',
            'body' => '本文',
            'category_id' => $category->id,
            'status' => 'published',
            'published_at' => $publishedAt->format('Y-m-d H:i:s')
        ];

        $this
            ->actingAs($user)
            ->post(route('admin.comics.store', absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('comics', [
            'title' => '公開日指定コミック',
            'published_at' => $publishedAt->format('Y-m-d H:i:s'),
        ]);
    }

    public function test_admin_comic_can_be_stored_without_published_at(): void
    {
        Carbon::setTestNow('2026-02-05 15:30:00');
        
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => true]);
        $category = Category::factory()->create(['content_id' => $content->id]);
        
        $payload = [
            'title' => '公開日未指定コミック',
            'body' => '本文',
            'category_id' => $category->id,
            'status' => 'published',
            'published_at' => ''
        ];

        $this
            ->actingAs($user)
            ->post(route('admin.comics.store', absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('comics', [
            'title' => '公開日未指定コミック',
            'published_at' => '2026-02-05 15:30:00',
        ]);
        
        Carbon::setTestNow();
    }

    public function test_admin_comic_can_be_updated_with_published_at(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => true]);
        $category = Category::factory()->create(['content_id' => $content->id]);
        $comic = Comic::factory()->create([
            'content_id' => $content->id,
            'category_id' => $category->id,
            'published_at' => '2026-02-01 10:00:00'
        ]);
        
        $newPublishedAt = Carbon::parse('2026-03-15 14:30:00');
        
        $payload = [
            'title' => $comic->title,
            'body' => $comic->body,
            'category_id' => $category->id,
            'status' => 'published',
            'published_at' => $newPublishedAt->format('Y-m-d H:i:s')
        ];

        $this
            ->actingAs($user)
            ->put(route('admin.comics.update', ['comic' => $comic->id], absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('comics', [
            'id' => $comic->id,
            'published_at' => $newPublishedAt->format('Y-m-d H:i:s'),
        ]);
    }

    public function test_admin_comic_can_be_updated_without_published_at(): void
    {
        Carbon::setTestNow('2026-02-05 16:45:00');
        
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => true]);
        $category = Category::factory()->create(['content_id' => $content->id]);
        $comic = Comic::factory()->create([
            'content_id' => $content->id,
            'category_id' => $category->id,
            'published_at' => '2026-02-01 10:00:00'
        ]);
        
        $payload = [
            'title' => $comic->title,
            'body' => $comic->body,
            'category_id' => $category->id,
            'status' => 'published',
            'published_at' => ''
        ];

        $this
            ->actingAs($user)
            ->put(route('admin.comics.update', ['comic' => $comic->id], absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('comics', [
            'id' => $comic->id,
            'published_at' => '2026-02-05 16:45:00',
        ]);
        
        Carbon::setTestNow();
    }
}

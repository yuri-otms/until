<?php

namespace Tests\Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Theme;
use App\Models\Content;
use App\Models\Post;
use Carbon\Carbon;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_post_page_can_be_rendered_when_categories_is_not_set(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);

        $this
            ->actingAs($user)
            ->get(route('admin.posts.index', ['content' => $content->slug]))
            ->assertStatus(200);
    }

    public function test_admin_post_create_can_be_rendered(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);
        $this
            ->actingAs($user)
            ->get(route('admin.posts.create', ['content' => $content->slug]))
            ->assertStatus(200);
    }

    public function test_admin_post_can_be_stored(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);
        $payload = [
            'title' => 'カテゴリ無し記事',
            'body' => '本文',
            'category_id' => 0,
            'content_id' => $content->id,
            'status' => 'published'
        ];

        $this
            ->actingAs($user)
            ->post(route('admin.posts.store', absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('posts', [
            'title' => 'カテゴリ無し記事',
            'category_id' => 0,
        ]);
    }

    public function test_admin_post_can_be_stored_with_published_at(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);
        $publishedAt = Carbon::parse('2026-03-01 10:30:00');
        
        $payload = [
            'title' => '公開日指定記事',
            'body' => '本文',
            'category_id' => 0,
            'content_id' => $content->id,
            'status' => 'published',
            'published_at' => $publishedAt->format('Y-m-d H:i:s')
        ];

        $this
            ->actingAs($user)
            ->post(route('admin.posts.store', absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('posts', [
            'title' => '公開日指定記事',
            'published_at' => $publishedAt->format('Y-m-d H:i:s'),
        ]);
    }

    public function test_admin_post_can_be_stored_without_published_at(): void
    {
        Carbon::setTestNow('2026-02-05 15:30:00');
        
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);
        
        $payload = [
            'title' => '公開日未指定記事',
            'body' => '本文',
            'category_id' => 0,
            'content_id' => $content->id,
            'status' => 'published',
            'published_at' => ''
        ];

        $this
            ->actingAs($user)
            ->post(route('admin.posts.store', absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('posts', [
            'title' => '公開日未指定記事',
            'published_at' => '2026-02-05 15:30:00',
        ]);
        
        Carbon::setTestNow();
    }

    public function test_admin_post_can_be_updated_with_published_at(): void
    {
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);
        $post = Post::factory()->create([
            'content_id' => $content->id,
            'category_id' => 0,
            'published_at' => '2026-02-01 10:00:00'
        ]);
        
        $newPublishedAt = Carbon::parse('2026-03-15 14:30:00');
        
        $payload = [
            'title' => $post->title,
            'body' => $post->body,
            'category_id' => 0,
            'content_id' => $content->id,
            'status' => 'published',
            'published_at' => $newPublishedAt->format('Y-m-d H:i:s')
        ];

        $this
            ->actingAs($user)
            ->put(route('admin.posts.update', ['post' => $post->id], absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'published_at' => $newPublishedAt->format('Y-m-d H:i:s'),
        ]);
    }

    public function test_admin_post_can_be_updated_without_published_at(): void
    {
        Carbon::setTestNow('2026-02-05 16:45:00');
        
        $user = User::factory()->create();
        $content = Content::factory()->create(['has_categories' => false]);
        $post = Post::factory()->create([
            'content_id' => $content->id,
            'category_id' => 0,
            'published_at' => '2026-02-01 10:00:00'
        ]);
        
        $payload = [
            'title' => $post->title,
            'body' => $post->body,
            'category_id' => 0,
            'content_id' => $content->id,
            'status' => 'published',
            'published_at' => ''
        ];

        $this
            ->actingAs($user)
            ->put(route('admin.posts.update', ['post' => $post->id], absolute:false), $payload)
            ->assertRedirect();

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'published_at' => '2026-02-05 16:45:00',
        ]);
        
        Carbon::setTestNow();
    }
}

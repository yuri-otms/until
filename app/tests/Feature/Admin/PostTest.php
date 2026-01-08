<?php

namespace Tests\Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Theme;
use App\Models\Content;

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
}

<?php

namespace App\Policies;

use App\Models\Comic;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ComicPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(?User $user, Comic $comic): bool
    {
        if ($comic->status == 'published') {
            // 公開日が未来の場合はログインユーザーのみ閲覧可能
            if ($comic->published_at && $comic->published_at > now()) {
                return $user !== null;
            }
            return true;
        }

        return $user !== null;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Comic $post): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Comic $post): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Comic $post): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Comic $post): bool
    {
        return false;
    }
}

<?php

namespace App\Trait;

use Illuminate\Console\Command;

trait PreventsDuplicateImport
{
    protected function abortIfAlreadyImported(
        callable $existsCallback,
        string $message = 'すでにこのコマンドは実行されています'
    ): void {
        if ($existsCallback()) {
            $this->warn($message);
            exit(Command::FAILURE);
        }
    }
}

<?php

declare(strict_types=1);

arch()->preset()->php();
arch()->preset()->strict();
arch()->preset()->security()->ignoring([
    'assert',
]);

arch('actions')
    ->expect('App\\Actions')
    ->toBeFinal()
    ->toBeReadonly()
    ->toHaveMethod('handle');

arch('controllers')
    ->expect('App\Http\Controllers')
    ->not->toBeUsed();

//

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

arch('form requests')
    ->expect('App\\Http\\Requests')
    ->toExtend('Illuminate\\Foundation\\Http\\FormRequest');

arch('debug helpers')
    ->expect('App')
    ->not->toUse([
        'dd',
        'dump',
        'ray',
        'var_dump',
        'print_r',
    ]);

arch('controllers')
    ->expect('App\Http\Controllers')
    ->not->toBeUsed();

//

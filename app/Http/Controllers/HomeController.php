<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

use App\Services\SportsDbService;

class HomeController extends Controller
{
    protected $sportsDb;

    public function __construct(SportsDbService $sportsDb)
    {
        $this->sportsDb = $sportsDb;
    }

    public function index()
    {
        $teams = $this->sportsDb->getUniqueTeams();

        return Inertia::render('Home', [
            'teams' => $teams
        ]);
    }
}

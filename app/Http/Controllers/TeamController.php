<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\SportsDbService;

class TeamController extends Controller
{
    protected $sportsDb;

    public function __construct(SportsDbService $sportsDb)
    {
        $this->sportsDb = $sportsDb;
    }

    public function show($id)
    {
        $data = $this->sportsDb->getTeamMatches($id); // Will return matches, team info, stadium etc.

        // Also get individual team details for fuller info if needed (like description, social links).
        // The service's getTeamMatches logic in source extracted name/badge from events.
        // But source also called `getTeamDetails` for social links and description.
        // I should probably add `getTeamDetails` to service too if I want full fidelity.
        // For now, let's stick to what we implemented in Service: past/upcoming matches basics.
        // If I need more, I'll update Service. 
        // NOTE: The previous `SportsDbService` implementation of `getTeamMatches` returns 'past', 'upcoming', 'teamName', 'teamBadge', 'stadium'.
        // It does NOT return social links (strWebsite, strFacebook etc) or description.
        // The original Next.js page used `getTeamDetails` for that.
        // I should update the Service to include `getTeamDetails` logic.

        return Inertia::render('Teams/Show', [
            'team' => [
                'id' => $id,
                'name' => $data['teamName'],
                'badge' => $data['teamBadge'],
                'stadium' => $data['stadium'],
                // Add validation/defaults as API might return nulls
            ],
            'matches' => [
                'past' => $data['past'],
                'upcoming' => $data['upcoming']
            ]
        ]);
    }

    public function indexApi()
    {
        return response()->json($this->sportsDb->getUniqueTeams());
    }
}

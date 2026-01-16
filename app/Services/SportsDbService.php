<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class SportsDbService
{
    protected $baseUrl = 'https://www.thesportsdb.com/api/v1/json/3'; // Using free tier key '3' or generic. Source had environment variable. Assuming '3' varies or need a key. Source code used process.env but comment said '3'. 
    // Wait, the source used `id=5064&s=2025`. The Base URL in source was likely `https://www.thesportsdb.com/api/v1/json/3` or similar. 
    // I'll use `https://www.thesportsdb.com/api/v1/json/3` as a safe default for testing (common public key).

    public function fetchLMBData()
    {
        return Cache::remember('lmb_data', 3600, function () {
            // Endpoint: /eventsseason.php?id=5064&s=2025
            $response = Http::get("{$this->baseUrl}/eventsseason.php?id=5064&s=2025");

            if ($response->successful()) {
                return $response->json()['events'] ?? [];
            }

            return [];
        });
    }

    public function getUniqueTeams()
    {
        $events = $this->fetchLMBData();
        $teamsMap = [];

        // Constants from frontend
        $teamStadiums = [
            "142008" => "Estadio Alfredo Harp Helú",
            "142004" => "Estadio Mobil Super",
            "142015" => "Estadio Beto Ávila",
            "142011" => "Parque Kukulcán Alamo",
            "142014" => "Estadio Nelson Barrera Romellón",
            "141999" => "Estadio Revolución",
            "142304" => "Estadio Monumental Chihuahua",
            "141998" => "Estadio Monclova",
            "142005" => "Parque La Junta / Uni-Trade Stadium",
            "144284" => "Estadio Panamericano",
            "142012" => "Estadio Centenario 27 de Febrero",
            "142010" => "Estadio Eduardo Vasconcelos",
            "142006" => "Estadio Chevron",
            "142002" => "Parque Alberto Romo Chávez",
            "142009" => "Estadio Beto Ávila",
            "142013" => "Estadio Hermanos Serdán",
            "151312" => "Estadio Francisco Villa",
            "142003" => "Estadio Francisco I. Madero",
            "148486" => "Estadio Finsus",
        ];

        foreach ($events as $event) {
            // Home Team
            if (!isset($teamsMap[$event['idHomeTeam']])) {
                $teamsMap[$event['idHomeTeam']] = [
                    'id' => $event['idHomeTeam'],
                    'name' => $event['strHomeTeam'],
                    'badge' => $event['strHomeTeamBadge'],
                    'stadium' => $teamStadiums[$event['idHomeTeam']] ?? $event['strVenue']
                ];
            }

            // Away Team
            if (!isset($teamsMap[$event['idAwayTeam']])) {
                $teamsMap[$event['idAwayTeam']] = [
                    'id' => $event['idAwayTeam'],
                    'name' => $event['strAwayTeam'],
                    'badge' => $event['strAwayTeamBadge'],
                    'stadium' => $teamStadiums[$event['idAwayTeam']] ?? null // Don't know stadium from away data usually
                ];
            }
        }

        return array_values($teamsMap);
    }

    public function getTeamMatches($teamId)
    {
        $events = $this->fetchLMBData();

        $teamEvents = array_filter($events, function ($e) use ($teamId) {
            return $e['idHomeTeam'] == $teamId || $e['idAwayTeam'] == $teamId;
        });

        // Sort by date desc
        usort($teamEvents, function ($a, $b) {
            return strtotime($b['dateEvent']) - strtotime($a['dateEvent']);
        });

        $homeGame = null;
        foreach ($teamEvents as $e) {
            if ($e['idHomeTeam'] == $teamId) {
                $homeGame = $e;
                break;
            }
        }
        $representativeEvent = $homeGame ?? ($teamEvents[0] ?? null);

        $teamName = "";
        $teamBadge = "";
        $stadium = "";

        if ($representativeEvent) {
            if ($representativeEvent['idHomeTeam'] == $teamId) {
                $teamName = $representativeEvent['strHomeTeam'];
                $teamBadge = $representativeEvent['strHomeTeamBadge'];
                $stadium = $representativeEvent['strVenue'];
            } else {
                $teamName = $representativeEvent['strAwayTeam'];
                $teamBadge = $representativeEvent['strAwayTeamBadge'];
            }
        }

        $past = [];
        $upcoming = [];
        $now = time();

        foreach ($teamEvents as $e) {
            if (strtotime($e['dateEvent']) < $now) {
                $past[] = $e;
            } else {
                $upcoming[] = $e;
            }
        }

        // Reverse upcoming to be ascending date? Original code reversed it. 
        // Original: const upcoming = teamEvents.filter(e => new Date(e.dateEvent) >= now).reverse();
        // Since we sorted desc, upcoming is [future_late, ..., future_near]. Reversing gives [future_near, ..., future_late].
        $upcoming = array_reverse($upcoming);

        return [
            'past' => $past,
            'upcoming' => $upcoming,
            'teamName' => $teamName,
            'teamBadge' => $teamBadge,
            'stadium' => $stadium
        ];
    }
}

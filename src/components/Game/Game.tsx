"use client";

import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import styles from "./Game.module.css";
import { useState, useEffect } from "react";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PlayerHoleItem from "../PlayerHoleItem/PlayerHoleItem";
import LeaderboardModal from "../LeaderboardModal/Leaderboard";

const HOLES = Array.from({ length: 18 }, (_, i) => ({
  key: (i + 1).toString(),
  label: `Loch ${i + 1}`,
}));

interface LeaderboardEntry {
  player: string;
  total: number;
  rank: number;
}


const Game = ({ players }: { players: string[] }) => {
  const [selectedHole, setSelectedHole] = useState(HOLES[0]);
  const [scores, setScores] = useState<{
    [key: string]: { [hole: string]: number };
  }>({});

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores && storedScores.length > 0)
      setScores(JSON.parse(storedScores));
  }, []);

  useEffect(() => {
    if (scores && Object.keys(scores).length > 0) {
      localStorage.setItem("scores", JSON.stringify(scores));
    }
  }, [scores]);

  function handleChangeHole(hole: any) {
    if (hole) setSelectedHole(HOLES[hole.anchorKey - 1]);
  }

  function handleSelectScore(player: string, hole: string, score: number) {
    setScores({
      ...scores,
      [player]: {
        ...scores[player],
        [hole]: score,
      },
    });
  }

  function handleResetGame() {
    setScores({});
    localStorage.clear();
    window.location.reload();
  }

  function calculateLeaderboard(): LeaderboardEntry[] {
    // Calculate total scores for each player
    const leaderboard = players
      .map((player) => ({
        player,
        total: Object.values(scores[player] || {}).reduce((a, b) => a + b, 0),
      }))
      .sort((a, b) => a.total - b.total);
  
    // Assign ranks, handling ties
    const rankedLeaderboard: LeaderboardEntry[] = [];
    let rank = 1;
  
    for (let i = 0; i < leaderboard.length; i++) {
      if (i > 0 && leaderboard[i].total === leaderboard[i - 1].total) {
        // If the current score is the same as the previous score, share the same rank
        rankedLeaderboard.push({ ...leaderboard[i], rank: rankedLeaderboard[i - 1].rank });
      } else {
        // Otherwise, assign the current rank
        rankedLeaderboard.push({ ...leaderboard[i], rank });
      }
  
      // Move to the next rank, but only if the current player does not tie with the next one
      if (i < leaderboard.length - 1 && leaderboard[i].total !== leaderboard[i + 1].total) {
        rank++;
      }
    }
  
    return rankedLeaderboard;
  }
  
  
  
  

  return (

    <section className={styles.game}>
      <div className={styles.header}>
        <Select
          items={HOLES}
          placeholder="Piste auswählen"
          className="max-w-xs"
          aria-label="Hole selection"
          selectedKeys={[selectedHole.key]} // Make the select component controlled
          onSelectionChange={handleChangeHole}
        >
          {(hole) => <SelectItem key={hole.key}>{hole.label}</SelectItem>}
        </Select>

        <div className={styles.buttons}>
        <LeaderboardModal leaderboard={calculateLeaderboard()} />

          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly color="primary" className={styles.more}>
                <MoreVertRoundedIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Action event example"
              onAction={handleResetGame}
            >
              <DropdownItem key="reset">Neues Spiel</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <br />
      <Divider />
      <br />

      <div className={styles.players}>
        {players.map((player) => (
          <PlayerHoleItem
            key={player}
            player={player}
            score={scores[player]?.[selectedHole?.key] || 0}
            onSelectScore={(score: number) =>
              handleSelectScore(player, selectedHole?.key, score)
            }
          />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <Pagination
          size="lg"
          showControls
          total={HOLES.length}
          page={HOLES.indexOf(selectedHole) + 1}
          onChange={(page) => setSelectedHole(HOLES[page - 1])} // Directly update the selectedHole state
        />
      </div>
    </section>
  );
};

export default Game;

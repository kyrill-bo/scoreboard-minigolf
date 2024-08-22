"use client";
import styles from "./page.module.css";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PlayerListComponent from "@/components/PlayerList/PlayerList";
import AddPlayerModal from "@/components/AddPlayer/AddPlayerModal";
import Game from "@/components/Game/Game";
import Loading from "@/components/Loading/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [playerList, setPlayerList] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [error, setError] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const storedPlayers = localStorage.getItem("playerList");
    const storedScores = localStorage.getItem("scores");
    if (storedPlayers && storedPlayers.length > 0)
      setPlayerList(JSON.parse(storedPlayers));
    if (storedScores && storedScores.length > 0) {
      setGameStarted(true);
    } else {
      setGameStarted(false);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (playerList.length > 0)
      localStorage.setItem("playerList", JSON.stringify(playerList));
  }, [playerList]);

  const handleAddPlayer = () => {
    if (newPlayer.length > 3) {
      setPlayerList([...playerList, newPlayer]);
      setNewPlayer("");
      setError("");
      onOpenChange(); // Close the modal after adding the player
    } else {
      setError("Der Name muss länger als 3 Buchstaben sein.");
    }
  };

  const handleDeletePlayer = (index: number) => {
    const newPlayerList = [...playerList];
    newPlayerList.splice(index, 1);
    setPlayerList(newPlayerList);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };


  if(isLoading) return <Loading />;

  return (
    <main className={styles.main}>
      {gameStarted ? (
        <Game players={playerList} />
      ) : (
        <section className={styles.game}>
          {playerList.length === 0 ? (
            <>
              <h1 className={styles.start_title}>Scoreboard</h1>
              <Image
                src="/minigolf.png"
                alt="Minigolf Landshut"
                width={300}
                height={0}
                priority
                className={styles.start_image}
              />
              <button onClick={onOpen} className={styles.start_button}>
                Starten
              </button>
            </>
          ) : (
            <>
              <PlayerListComponent
                playerList={playerList}
                handleDeletePlayer={handleDeletePlayer}
              />
              <Button
                startContent={<AddRoundedIcon />}
                color="success"
                radius="full"
                onClick={onOpen}
                variant="solid"
                className={styles.add_player_button}
              >
                Spieler hinzufügen
              </Button>
              <Button
                onClick={handleStartGame}
                size="lg"
                className={styles.start_button}
              >
                Spiel starten
              </Button>
            </>
          )}
        </section>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <AddPlayerModal
          newPlayer={newPlayer}
          setNewPlayer={setNewPlayer}
          handleAddPlayer={handleAddPlayer}
          error={error}
          onClose={onOpenChange}
        />
      </Modal>
    </main>
  );
}

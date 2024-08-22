import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import styles from "./PlayerList.module.css";

export default function PlayerListComponent({ playerList, handleDeletePlayer }: any) {
  return (
    <section className={styles.player_section}>
      <h1 className={styles.start_title}>Spieler</h1>
      <div className={styles.player_list}>
        {playerList.map((player: string, index: number) => (
          <div key={player} className={styles.player_item}>
            <p>{player}</p>
            <DeleteRoundedIcon onClick={() => handleDeletePlayer(index)} className={styles.delete_icon} />
          </div>
        ))}
      </div>
    </section>
  );
}

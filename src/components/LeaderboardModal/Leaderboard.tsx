import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import styles from "./Leaderboard.module.css";

import LeaderboardRoundedIcon from "@mui/icons-material/LeaderboardRounded";

// Define the interface for leaderboard entries
interface LeaderboardEntry {
  player: string;
  total: number;
  rank: number;
}

// Define the props for the LeaderboardModal component
interface LeaderboardModalProps {
  leaderboard: LeaderboardEntry[];
}

// Functional component for the leaderboard modal
export default function LeaderboardModal({ leaderboard }: LeaderboardModalProps) {
  // Modal open/close state
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* Button to open the modal */}
      <Button color="primary" onClick={onOpen}>
        <p>Rangliste</p>
        <LeaderboardRoundedIcon />
      </Button>

      {/* Modal component */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Rangliste</ModalHeader>
          <ModalBody>
            <div className={styles.leaderboard}>
              {/* Display each leaderboard entry */}
              {leaderboard.map((entry) => (
                <div key={entry.player} className={styles.leaderboardItem}>
                  <span>{entry.rank}. {entry.player}</span>
                  <span>{entry.total} Punkte</span>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            {/* Button to close the modal */}
            <Button color="primary" onPress={onOpenChange}>
              Schließen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

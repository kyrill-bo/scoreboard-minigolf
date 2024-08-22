import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import styles from "./PlayerHoleItem.module.css";
import { useState } from "react";

export default function PlayerHoleItem({ player, score, onSelectScore }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [otherNumber, setOtherNumber] = useState(score);

  function handleSelectScore(hole: number) {
    onSelectScore(hole);

    if (isOpen) {
      onOpenChange(); // Close the modal after selecting the score
    }
  }

  return (
    <>
      <div className={styles.playerStatsItem}>
        <p className={styles.playerName}>{player}</p>
        <Divider />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  onClick={() => handleSelectScore(num)}
                  className={
                    styles.holeStat +
                    " " +
                    (score === num ? styles.selected : "")
                  }
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-2">
              {[5, 6, 7].map((num) => (
                <div
                  key={num}
                  onClick={() => handleSelectScore(num)}
                  className={
                    styles.holeStat +
                    " " +
                    (score === num ? styles.selected : "")
                  }
                >
                  {num}
                </div>
              ))}
              <div onClick={onOpenChange} className={styles.holeStat +
                    " " +
                    (score > 7 ? styles.selected : "")}>
                ?
              </div>
            </div>
          </div>

          <p className={styles.score}>{score}</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Score</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Score"
                  placeholder="1"
                  variant="bordered"
                  type="number"
                  value={otherNumber}
                  onChange={(e) => setOtherNumber(parseInt(e.target.value))}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Abbrechen
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleSelectScore(otherNumber)}
                >
                  Bestätigen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

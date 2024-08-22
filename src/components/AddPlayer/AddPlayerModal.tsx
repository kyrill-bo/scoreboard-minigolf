import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function AddPlayerModal({
  newPlayer,
  setNewPlayer,
  handleAddPlayer,
  error,
  onClose,
}: any) {
  return (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1">Spieler hinzufügen</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Spielername"
          placeholder="Spielername eingeben"
          variant="bordered"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          isInvalid={error.length > 0}
          errorMessage={error}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Abbrechen
        </Button>
        <Button color="primary" onPress={handleAddPlayer}>
          Eintragen
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

let currentRoomID = "";

export function setRoomID(roomId) {
  currentRoomID = roomId;
}

export function getRoomID() {
  return currentRoomID;
}

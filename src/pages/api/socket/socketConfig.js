import { Server } from "socket.io";
import { getRoomID, setRoomID } from "@/pages/helper/roomManager";
//To use socket in any page, just do like this page
export const config = {
  api: {
    bodyParser: false,
  },
};
var roomid = "";
//handle socket connection
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("Creating socket server..");
    const io = new Server(res.socket.server, {
      path: "/api/socket/socketConfig",
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    //handleSocketEvents
    io.on("connection", (socket) => {
      console.log("A user connected, id:", socket.id);
      socket.on("joinRoom", (roomID) => {
        socket.join(roomID);
        setRoomID(roomID);
        console.log(`User ${socket.id} joined room ${roomID}`);
      });

      socket.on("clientMessege", (data, roomID) => {
        const roomid = getRoomID();
        console.log("data", data, "roomID: ", roomid);
        const modifiedData = { id: socket.id, data: data };

        if (data && roomid) {
          socket.to(roomid).emit("serverMessege", modifiedData);
        } else if (data && !roomid) {
          socket.broadcast.emit("serverMessege", modifiedData);
        }
      });
    });
  }
  res.end();
};
export default ioHandler;

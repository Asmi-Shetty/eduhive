// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import io from "socket.io-client";
// import Peer from "simple-peer";

// const socket = io("http://localhost:6471");

// const JoinMeeting = () => {
//     const { meetingId } = useParams();
//     const [peers, setPeers] = useState([]);
//     const userVideo = useRef();
//     const peersRef = useRef([]);

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then(stream => {
//                 userVideo.current.srcObject = stream;

//                 socket.emit("join-meeting", { meetingId, userId: socket.id });

//                 socket.on("user-connected", userId => {
//                     const peer = createPeer(userId, socket.id, stream);
//                     peersRef.current.push({ peerID: userId, peer });
//                     setPeers([...peersRef.current]);
//                 });
//             });

//         return () => socket.disconnect();
//     }, [meetingId]);

//     const createPeer = (userToSignal, callerID, stream) => {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false,
//             stream
//         });

//         peer.on("signal", signal => {
//             socket.emit("sending-signal", { userToSignal, callerID, signal });
//         });

//         return peer;
//     };

//     return (
//         <div>
//             <h1>Meeting ID: {meetingId}</h1>
//             <video ref={userVideo} autoPlay playsInline />
//             {peers.map((peerObj, index) => (
//                 <Video key={index} peer={peerObj.peer} />
//             ))}
//         </div>
//     );
// };

// const Video = ({ peer }) => {
//     const ref = useRef();

//     useEffect(() => {
//         peer.on("stream", stream => {
//             ref.current.srcObject = stream;
//         });
//     }, []);

//     return <video ref={ref} autoPlay playsInline />;
// };

// export default JoinMeeting;

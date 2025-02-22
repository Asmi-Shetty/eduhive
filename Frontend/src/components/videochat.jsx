import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ToggleButton from "./toggleButton";
import { faVolumeUp, faVolumeMute, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";

const SERVER_URL = "http://localhost:6471"; // Change to your backend URL
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // Google's public STUN server
  ],
};

const VideoChat = ({ roomId, username }) => {
  const [peers, setPeers] = useState([]);
  const [mute, setMute] = useState(false);
  const [video, setVideo] = useState(true);
  const socketRef = useRef();
  const localStreamRef = useRef();
  const peerConnections = useRef({});

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current.srcObject = stream;

        socketRef.current.emit("joinRoom", { roomId, username });

        socketRef.current.on("userJoined", ({ id }) => {
          createPeerConnection(id, stream);
        });

        socketRef.current.on("updateUserList", (users) => {
          setPeers(users.filter((user) => user.id !== socketRef.current.id));
        });

        socketRef.current.on("signal", handleSignal);
      });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, username]);

  const createPeerConnection = (peerId, stream) => {
    const peerConnection = new RTCPeerConnection(ICE_SERVERS);
    peerConnections.current[peerId] = peerConnection;

    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("signal", {
          to: peerId,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event) => {
      setPeers((prevPeers) =>
        prevPeers.map((peer) =>
          peer.id === peerId ? { ...peer, stream: event.streams[0] } : peer
        )
      );
    };

    peerConnection
      .createOffer()
      .then((offer) => peerConnection.setLocalDescription(offer))
      .then(() => {
        socketRef.current.emit("signal", {
          to: peerId,
          offer: peerConnection.localDescription,
        });
      });
  };

  const handleSignal = async ({ from, offer, answer, candidate }) => {
    const peerConnection = peerConnections.current[from];

    if (offer) {
      peerConnections.current[from] = new RTCPeerConnection(ICE_SERVERS);
      const newPeerConnection = peerConnections.current[from];

      localStreamRef.current.srcObject
        .getTracks()
        .forEach((track) => newPeerConnection.addTrack(track, localStreamRef.current.srcObject));

      newPeerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit("signal", {
            to: from,
            candidate: event.candidate,
          });
        }
      };

      newPeerConnection.ontrack = (event) => {
        setPeers((prevPeers) =>
          prevPeers.map((peer) =>
            peer.id === from ? { ...peer, stream: event.streams[0] } : peer
          )
        );
      };

      await newPeerConnection.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await newPeerConnection.createAnswer();
      await newPeerConnection.setLocalDescription(answer);

      socketRef.current.emit("signal", { to: from, answer });
    }

    if (answer) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }

    if (candidate) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const handleMuteToggle = () => {
    setMute((prevMute) => !prevMute);
    localStreamRef.current.srcObject.getAudioTracks().forEach((track) => {
      track.enabled = !mute;
    });
  };

  const handleVideoToggle = () => {
    setVideo((prevVideo) => !prevVideo);
    localStreamRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.enabled = !video;
    });
  };

  return (
    <div className="video-chat-container text-white text-2xl">
      <h2>Video Chat Room: {roomId}</h2>

      <video ref={localStreamRef} className="w-full h-140 bg-black" autoPlay playsInline muted />

      <div className="peer-videos">
        {peers.map((peer) => (
          <video
            key={peer.id}
            ref={(video) => {
              if (video && peer.stream) video.srcObject = peer.stream;
            }}
            className="w-full h-140 bg-black"
            autoPlay
            playsInline
          />
        ))}
      </div>

      <div className="controls">
        <ToggleButton
          initialState={mute}
          onToggle={handleMuteToggle}
          labels={["Mute", "Unmute"]}
          label="Voice"
          icons={[faVolumeMute, faVolumeUp]}
        />
        <ToggleButton
          initialState={video}
          onToggle={handleVideoToggle}
          labels={["Video Off", "Video On"]}
          label="Video"
          icons={[faVideo, faVideoSlash]}
        />
      </div>
    </div>
  );
};

export default VideoChat;

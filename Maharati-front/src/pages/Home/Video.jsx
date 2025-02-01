import React, { useState } from "react";
import axios from "axios";

function Video() {
  const [meetingID, setMeetingID] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [fullName, setFullName] = useState("");
  const [joinURL, setJoinURL] = useState("");

  // Create a new meeting
  const createMeeting = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HOST}/create-meeting`,
        {
          meetingID,
          meetingName,
        }
      );
      console.log("Meeting created:", response.data);
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  // Join an existing meeting
  const joinMeeting = async (isModerator) => {
    try {
      const response = await axios.post("http://localhost:5000/join-meeting", {
        fullName,
        meetingID,
        isModerator,
      });
      setJoinURL(response.data.joinURL);
    } catch (error) {
      console.error("Error joining meeting:", error);
    }
  };

  return (
    <div className="App">
      <h1>BigBlueButton Streaming App</h1>

      {/* Create Meeting */}
      <div>
        <h2>Create a Meeting</h2>
        <input
          type="text"
          placeholder="Meeting ID"
          value={meetingID}
          onChange={(e) => setMeetingID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Meeting Name"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <button onClick={createMeeting}>Create Meeting</button>
      </div>

      {/* Join Meeting */}
      <div>
        <h2>Join a Meeting</h2>
        <input
          type="text"
          placeholder="Your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <button onClick={() => joinMeeting(false)}>Join as Attendee</button>
        <button onClick={() => joinMeeting(true)}>Join as Moderator</button>
      </div>

      {/* Join URL */}
      {joinURL && (
        <div>
          <h2>Meeting Link</h2>
          <a href={joinURL} target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
        </div>
      )}
    </div>
  );
}

export default Video;

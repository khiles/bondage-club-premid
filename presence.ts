const presence = new Presence({
  clientId: "1458571834176831509" // From your Discord app
});

const timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo", // Matches the asset name you uploaded
    startTimestamp: timestamp,
    details: "Playing in the Club",
    state: "Exploring..."
  };

  // Detect game variables (Bondage Club exposes these globally)
  if (typeof CurrentScreen !== "undefined") {
    if (CurrentScreen === "ChatRoom") {
      presenceData.state = `In a room with ${ChatRoomCharacter?.length || 0} players`;
    } else if (CurrentScreen === "Private") {
      presenceData.state = "In a private room";
    } else {
      presenceData.state = `On: ${CurrentScreen.replace(/([A-Z])/g, ' $1').trim()}`;
    }
  }

  presence.setActivity(presenceData);
});

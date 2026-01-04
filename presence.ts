const presence = new Presence({
  clientId: "1457449112566890771"  // Your special number from before, keep it!
});

presence.on("UpdateData", async () => {
  if (document.location.pathname.includes("/club_game/") || document.location.pathname.includes("/club/")) {
    let details = "In menus";
    let state = "Free";

    // Wait for BC stuff to load, like magic!
    if (typeof Player !== "undefined" && Player && typeof CurrentScreen !== "undefined") {
      if (CurrentScreen === "ChatRoom" && ChatRoomData?.Name) {
        details = `In ${ChatRoomData.Name}`;
      } else if (CurrentScreen === "ChatSearch" || CurrentScreen === "Online") {
        details = "Browsing rooms";
      } else {
        details = "In menus";
      }

      const locked: string[] = [];
      if (Player.Appearance) {
        for (const item of Player.Appearance) {
          if (item.Property?.Lock) {
            let name = (item.Asset?.Name || "").replace(/^Item/, "").replace(/([a-z])([A-Z])/g, "$1 $2").trim();
            if (name) locked.push(name);
          }
        }
      }
      if (locked.length > 0) {
        state = `Bound: ${locked.slice(0, 4).join(", ")}${locked.length > 4 ? "..." : ""}`;
      }
    }

    presence.setActivity({
      largeImageKey: "bc_logo",  // Upload a cute BC icon in your Discord app settings!
      details,
      state,
      startTimestamp: Math.floor(Date.now() / 1000)
    });
  } else {
    presence.setActivity();  // Shh, clear it if not on BC
  }
});

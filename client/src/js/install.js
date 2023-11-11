const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default prompt
  event.preventDefault();

  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Show the install button
  butInstall.style.display = "block";
});

// Click event handler for the install button
butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Simulate user interaction to trigger the installation
    deferredPrompt.prompt();

    // Wait for the user to respond to the simulated prompt
    const choiceResult = await deferredPrompt.userChoice;

    // Check if the user accepted the simulated prompt
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the simulated install prompt");
    } else {
      console.log("User dismissed the simulated install prompt");
    }

    // Clear the deferredPrompt variable
    deferredPrompt = null;

    // Hide the install button
    butInstall.style.display = "none";
  }
});

// Event handler for appinstalled event
window.addEventListener("appinstalled", (event) => {
  // Log that the app was successfully installed
  console.log("App successfully installed", event);

  // Hide the install button
  butInstall.style.display = "none";
});

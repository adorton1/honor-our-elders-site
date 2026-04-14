const shareButton = document.getElementById("share-story-button");
const shareStatus = document.getElementById("share-story-status");

async function copyPageUrl() {
  await navigator.clipboard.writeText(window.location.href);
  return "Link copied to clipboard.";
}

async function sharePage() {
  const shareData = {
    title: document.title,
    text: "Honor Our Elders with the Intertribal Community Council of Texas.",
    url: window.location.href,
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return "Thanks for sharing this story.";
  }

  if (navigator.clipboard) {
    return copyPageUrl();
  }

  throw new Error("Sharing is not supported on this device.");
}

if (shareButton && shareStatus) {
  shareButton.addEventListener("click", async () => {
    shareStatus.textContent = "";

    try {
      const message = await sharePage();
      shareStatus.textContent = message;
    } catch (error) {
      if (error.name === "AbortError") {
        shareStatus.textContent = "Share canceled.";
        return;
      }

      shareStatus.textContent = "Unable to share from this browser.";
    }
  });
}

const modalTriggers = document.querySelectorAll("[data-modal-target]");

function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.hidden = true;
}

function openModal(modal) {
  if (!modal) {
    return;
  }

  modal.hidden = false;
}

if (modalTriggers.length > 0) {
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      openModal(modal);
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const modal = closeButton.closest(".modal");
      closeModal(modal);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    document.querySelectorAll(".modal").forEach((modal) => {
      if (!modal.hidden) {
        closeModal(modal);
      }
    });
  });
}

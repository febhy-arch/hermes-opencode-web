const runButton = document.querySelector("#runButton");
const themeButton = document.querySelector("#themeButton");
const steps = [...document.querySelectorAll("[data-step]")];
const clock = document.querySelector("#clock");

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

async function simulateBuild() {
  runButton.disabled = true;
  runButton.textContent = "Build berjalan...";
  steps.forEach((step) => {
    step.classList.remove("active", "done");
    step.querySelector(".status").textContent = "Menunggu";
  });

  for (const step of steps) {
    step.classList.add("active");
    step.querySelector(".status").textContent = "Diproses";
    await new Promise((resolve) => setTimeout(resolve, 750));
    step.classList.remove("active");
    step.classList.add("done");
    step.querySelector(".status").textContent = "Selesai";
  }

  runButton.disabled = false;
  runButton.textContent = "Ulangi simulasi";
}

runButton.addEventListener("click", simulateBuild);
themeButton.addEventListener("click", () => document.body.classList.toggle("light"));

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copy);
    const original = button.textContent;
    button.textContent = "Tersalin";
    setTimeout(() => (button.textContent = original), 1200);
  });
});

updateClock();
setInterval(updateClock, 30000);

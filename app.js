"use strict";
(() => {
  const data = window.projectData;
  const video = document.getElementById("main-video");
  const error = document.getElementById("video-error");
  if (!data || !video) return;

  function selectPhase(id) {
    const phase = data.phases[id];
    if (!phase) return;
    video.pause();
    error.hidden = true;
    video.poster = phase.poster;
    video.src = phase.dual;
    video.setAttribute("aria-label", phase.label + " 드론·운전자 시점 동시 보기");
    video.load();
    document.getElementById("active-phase").textContent = phase.title;
    document.getElementById("metric-wp").textContent = phase.wp;
    document.getElementById("metric-time").replaceChildren(document.createTextNode(phase.seconds + " "), Object.assign(document.createElement("small"), {textContent:"초"}));
    document.getElementById("metric-reward").textContent = phase.reward;
    document.getElementById("metric-penalty").textContent = phase.penalty;
    document.getElementById("drone-link").href = phase.drone;
    document.getElementById("driver-link").href = phase.driver;
    document.getElementById("dual-link").href = phase.dual;
  }

  document.querySelectorAll('input[name="phase"]').forEach(input => {
    input.addEventListener("change", () => { if(input.checked) selectPhase(input.value); });
  });
  video.addEventListener("error", () => { error.hidden = false; });
  const players = [...document.querySelectorAll("video")];
  players.forEach(player => player.addEventListener("play", () => {
    players.forEach(other => { if(other !== player) other.pause(); });
  }));
})();

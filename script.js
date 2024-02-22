const card = document.getElementById("Card");
const videoBg = document.getElementById("bgVideo");

let rect = card.getBoundingClientRect();
let centerX = rect.left + rect.width / 2;
let centerY = rect.top + rect.height / 2;

const rotationThreshold = 20;

function calculateRotation(cursorPosition, centerPosition, threshold = 7) {
  const difference = cursorPosition - centerPosition;
  if (difference >= 0) {
    return Math.min(difference, threshold);
  } else {
    return Math.max(difference, -threshold);
  }
}

function calculateBrightness(cursorPosition, centerPosition, strength = 50) {
  const rotationAmount = calculateRotation(cursorPosition, centerPosition);
  return 1 - rotationAmount / strength;
}

window.addEventListener("resize", function (event) {
  rect = card.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;
})

card.addEventListener("mousemove", function (event) {
  videoBg.style.visibility = "visible";
  const rotationX = calculateRotation(event.x, centerX);
  const rotationY = calculateRotation(event.y, centerY);
  card.style.transform = `perspective(1500px) rotateY(${rotationX}deg) rotateX(${-rotationY}deg) translateZ(30px) `;
  card.style.width = `800px`;
  card.style.height = `400px`;
  card.style.filter = `brightness(${calculateBrightness(event.y, centerY)})`;
  card.style.boxShadow = `${-rotationX}px ${-rotationY}px 80px 0px rgba(48, 65, 0, 0.5)`;
})

card.addEventListener("mouseleave", function (event) {
  videoBg.style.visibility = "hidden";
  card.style.transform = `perspective(1000px)`;
  card.style.width = `800px`;
  card.style.height = `400px`;
  card.style.filter = `brightness(1)`;
  card.style.boxShadow = `0 0 0 0 rgba(48, 65, 0, 0.5)`;
})

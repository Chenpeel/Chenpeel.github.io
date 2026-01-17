import chineseLunar from "chinese-lunar";

function isWithinLunarNewYearRange() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // 获取农历新年的日期
  const lunarNewYear = chineseLunar.lunarToSolar({
    year: currentYear,
    month: 1,
    day: 1,
    leap: false,
  });

  // 确保 lunarNewYear 是一个有效的 Date 对象
  const lunarNewYearDate = new Date(lunarNewYear);

  const startRange = new Date(lunarNewYearDate);
  startRange.setDate(startRange.getDate() - 10);

  const endRange = new Date(lunarNewYearDate);
  endRange.setDate(endRange.getDate() + 10);

  return currentDate >= startRange && currentDate <= endRange;
}

function createLanternContainer(customText) {
  if (typeof window === "undefined" || !isWithinLunarNewYearRange()) {
    return;
  }

  if (document.querySelector(".lantern-container")) {
    return;
  }

  const container = document.createElement("div");
  container.className = "lantern-container";
  document.body.appendChild(container);

  const texts = customText ? customText.split("") : ["新", "年", "快", "乐"];

  texts.forEach((text, index) => {
    const box = document.createElement("div");
    box.className = `lantern-box lantern-box${index + 1}`;

    const lantern = document.createElement("div");
    lantern.className = "lantern";

    const hanging = document.createElement("div");
    hanging.className = "lantern-hanging";

    const lanternBody = document.createElement("div");
    lanternBody.className = "lantern-body";

    const lanternInner = document.createElement("div");
    lanternInner.className = "lantern-inner";

    const lanternText = document.createElement("div");
    lanternText.className = "lantern-text";
    lanternText.textContent = text;

    lanternInner.appendChild(lanternText);
    lanternBody.appendChild(lanternInner);
    lantern.appendChild(hanging);
    lantern.appendChild(lanternBody);

    const tassel = document.createElement("div");
    tassel.className = "lantern-tassel";

    const tasselTop = document.createElement("div");
    tasselTop.className = "lantern-tassel-top";
    const tasselBottom = document.createElement("div");
    tasselBottom.className = "lantern-tassel-bottom";

    tassel.appendChild(tasselTop);
    tassel.appendChild(tasselBottom);
    lantern.appendChild(tassel);
    box.appendChild(lantern);
    container.appendChild(box);
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    createLanternContainer("新年快乐");
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const keys = document.querySelectorAll(".key");

    keys.forEach((key) => {
      key.addEventListener("mouseenter", () => {
        const tooltip = key.querySelector(".tooltip");
        if (tooltip) {
          tooltip.style.display = "block";
        }
      });

      key.addEventListener("mouseleave", () => {
        const tooltip = key.querySelector(".tooltip");
        if (tooltip) {
          tooltip.style.display = "none";
        }
      });
    });
  });
}

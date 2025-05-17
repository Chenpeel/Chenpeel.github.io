export default function lanternPlugin() {
  return {
    name: "vitepress-plugin-lantern",
    transformIndexHtml(html: string) {
      console.log("Transforming HTML...");
      if (typeof window === "undefined" || !isWithinLunarNewYearRange()) {
        console.log("Not within Lunar New Year range or window is undefined.");
        return html;
      }

      console.log(
        "Within Lunar New Year range. Adding lantern container and script.",
      );

      return html
        .replace(
          "</head>",
          `<link rel="stylesheet" href="./theme/css/lantern.css"></head>`,
        )
        .replace(
          "</body>",
          `
        <script>
          console.log("Lantern script loaded.");
          function createLanternContainer(customText) {
            const container = document.createElement("div");
            container.className = "lantern-container";
            document.body.appendChild(container);

            const texts = customText ? customText.split("") : ["新", "年", "快", "乐"];

            texts.forEach((text, index) => {
              const box = document.createElement("div");
              box.className = \`lantern-box lantern-box\${index + 1}\`;

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

          document.addEventListener("DOMContentLoaded", function() {
            console.log("DOM fully loaded and parsed");
            createLanternContainer("新年快乐");
          });
        </script>
        </body>
        `,
        );
    },
  };
}

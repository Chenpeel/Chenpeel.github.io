// plugins/markdown-it-mermaid.mjs
export default function mermaidPlugin(md) {
  const defaultRender =
    md.renderer.rules.fence ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const code = token.content.trim();

    if (token.info === "mermaid") {
      return `<div class="mermaid">${code}</div>`;
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

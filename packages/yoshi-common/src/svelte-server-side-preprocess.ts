const scriptRegex = /(?<=<script>)((.|\n|\r)*)(?=<\/script>)/;

const replacement = `

  const modulesContext = require('svelte').getContext('modules')

  if (modulesContext) {
    modulesContext(module)
  }

`;

export default function() {
  return {
    markup: ({ content }: { content: string }) => {
      const scriptContent = scriptRegex.exec(content);

      // Source has a <script> tag
      if (scriptContent) {
        return {
          code: content.replace(scriptRegex, `${replacement} $1`),
        };
      }

      // Source doesn't have a <script> tag
      return {
        code: `<script>${replacement}</script>\n\n${content}`,
      };
    },
  };
}

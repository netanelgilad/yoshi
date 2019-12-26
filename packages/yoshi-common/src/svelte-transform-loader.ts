import { loader } from 'webpack';

const scriptRegex = /(?<=<script>)((.|\n|\r)*)(?=<\/script>)/;

const replacement = `

  const modulesContext = require('svelte').getContext('modules')

  if (modulesContext) {
    modulesContext(module)
  }

`;

const loader: loader.Loader = function(source) {
  const scriptContent = scriptRegex.exec(source as string);

  // Source has a <script> tag
  if (scriptContent) {
    return (source as string).replace(scriptRegex, `${replacement} $1`);
  }

  // Source doesn't have a <script> tag
  return `<script>${replacement}</script>\n\n${source}`;
};

export = loader;

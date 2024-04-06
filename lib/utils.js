import { unified } from 'unified';
import strip from 'strip-markdown';
import { remark } from 'remark';

function stripHtml(htmlString) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = htmlString;
  return tmp.textContent || tmp.innerText || '';
}

function stripMarkdown(markdown) {
  const vfile = remark()
    .use(strip)
    .processSync(markdown);
  return String(vfile);
}

function isSignedInUserVoted({ authUser, votesBy }) {
  if (authUser !== null) return votesBy.includes(authUser.id);
  return false;
}

export {
  stripHtml,
  isSignedInUserVoted,
  stripMarkdown,
};

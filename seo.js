// Crawlable HTML for the React app.
//
// The site renders in the browser, so a crawler that doesn't run JavaScript
// sees an empty <div id="root">. For each known page the server injects its
// own title, description, canonical URL and social tags into index.html, plus
// plain-HTML content with links that React replaces once it mounts.

const SITE_URL = "https://www.lingstales.com";
const SITE_NAME = "Ling's Tales";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/books", label: "Read The Emperor's Seed" },
  { path: "/book2", label: "Read Weighing the Elephant" },
  { path: "/ear-monkeys", label: "Play Ear Monkeys" },
];

const PAGES = {
  "/": {
    title: "Ling's Tales | Free Bilingual Chinese-English Children's Books",
    description:
      "Read Ling's Tales free online: illustrated children's books set in ancient China, in English and Simplified Chinese with Pinyin, plus the Ear Monkeys music game.",
    heading: "Ling's Tales: Bilingual Children's Books Set in Ancient China",
    body: [
      "Ling's Tales is a series of illustrated picture books set in ancient China, following a curious young hero named Ling. Every book is bilingual, with the story told in English alongside Simplified Chinese and Pinyin so that young readers and their families can learn the pronunciation together.",
      "David illustrated and wrote each story from his childhood memories of classic Chinese folktales, and Stacy adapted and translated the Chinese version. You can read every book in full for free on this website, or buy a printed copy on Amazon.",
      "Book 1, The Emperor's Seed, is a story about honesty. Book 2, Weighing the Elephant, retells the famous story of how a clever idea solved an impossible problem. Book 3 is coming soon.",
      "Between stories, try Ear Monkeys, a free ear-training game where a tree full of singing monkeys teaches children to recognise musical notes from A to G.",
    ],
  },
  "/books": {
    title: "The Emperor's Seed | Bilingual Children's Book | Ling's Tales",
    description:
      "Read The Emperor's Seed free online: Book 1 of Ling's Tales, an illustrated Chinese folktale about honesty, told in English and Simplified Chinese with Pinyin.",
    heading: "The Emperor's Seed (Ling's Tales, Book 1)",
    body: [
      "The Emperor's Seed is the first book in the Ling's Tales series. The emperor of ancient China needs to choose a successor, so he gives every child in the kingdom a seed and a challenge: grow the finest plant and bring it back to the palace in the spring.",
      "It is a gentle story about honesty and courage, retold from a classic Chinese folktale and illustrated in full colour.",
      "The full picture book is free to read online, page by page, in English with Simplified Chinese and Pinyin. Printed copies are available on Amazon.",
    ],
  },
  "/book2": {
    title: "Weighing the Elephant | Bilingual Children's Book | Ling's Tales",
    description:
      "Read Weighing the Elephant free online: Book 2 of Ling's Tales, the classic Chinese story of a clever idea, in English and Simplified Chinese with Pinyin.",
    heading: "Weighing the Elephant (Ling's Tales, Book 2)",
    body: [
      "Weighing the Elephant is the second book in the Ling's Tales series. A magnificent elephant arrives as a gift, and everyone wants to know how heavy it is, but no scale in the land is big enough to weigh it.",
      "This retelling of a famous Chinese story shows young readers how careful thinking can solve a problem that seems impossible.",
      "The full illustrated book is free to read online in English with Simplified Chinese and Pinyin, and printed copies are available on Amazon.",
    ],
  },
  "/ear-monkeys": {
    title: "Ear Monkeys | Free Music Ear-Training Game for Kids",
    description:
      "Play Ear Monkeys, a free ear-training game for kids. Each monkey on the tree sings a note from A to G; listen to the note and tap the monkey that sings it.",
    heading: "Ear Monkeys: A Free Ear-Training Game for Kids",
    body: [
      "Ear Monkeys is a free music game from Ling's Tales that helps children learn to hear the difference between notes. Each monkey sitting on the branches of the tree sings one note of the scale, from A to G.",
      "The game plays a note, and the player taps the monkey they think sings it. Start on an easier level with only a few monkeys on the tree, then add more as your ears improve. The game runs in the browser on phones, tablets and computers, and can be installed to the home screen.",
    ],
  },
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headTags(page, url) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}"/>`,
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}"/>`,
    `<meta property="og:title" content="${title}"/>`,
    `<meta property="og:description" content="${description}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:image" content="${OG_IMAGE}"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${title}"/>`,
    `<meta name="twitter:description" content="${description}"/>`,
    `<meta name="twitter:image" content="${OG_IMAGE}"/>`,
  ].join("");
}

function fallbackContent(page, path) {
  const links = NAV_LINKS.filter((link) => link.path !== path)
    .map((link) => `<li><a href="${link.path}">${escapeHtml(link.label)}</a></li>`)
    .join("");
  const paragraphs = page.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
  return (
    `<div class="container py-4">` +
    `<h1>${escapeHtml(page.heading)}</h1>${paragraphs}` +
    `<nav aria-label="Site"><ul>${links}</ul></nav>` +
    `</div>`
  );
}

// Rewrite the built index.html for a path. Unknown paths get a noindex tag
// so the app shell never gets indexed as a duplicate of the home page.
function renderPage(html, path) {
  const page = PAGES[path];
  // Drop the default tags from index.html; the page's own replace them.
  const base = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta[^>]*name="description"[^>]*>/i, "");
  if (!page) {
    return base.replace(
      "</head>",
      `<title>Page not found | ${escapeHtml(SITE_NAME)}</title><meta name="robots" content="noindex"/></head>`
    );
  }
  const url = SITE_URL + path;
  return base
    .replace("</head>", `${headTags(page, url)}</head>`)
    .replace(
      /<div id="root"><\/div>/,
      `<div id="root">${fallbackContent(page, path)}</div>`
    );
}

function sitemapXml() {
  const urls = Object.keys(PAGES)
    .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
    .join("\n");
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

function robotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

module.exports = { SITE_URL, PAGES, renderPage, sitemapXml, robotsTxt };

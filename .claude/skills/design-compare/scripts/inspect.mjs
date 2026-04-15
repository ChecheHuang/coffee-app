/**
 * inspect.mjs — Extract DOM structure and computed styles via Puppeteer
 * Usage: node inspect.mjs <url> [output.json] [--close]
 *   --close  Close browser after extraction (default: keep open for review)
 * Requires: npm install --save-dev puppeteer-core
 */

import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

const VIEWPORT = {
  width: 393,
  height: 852,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
};

const WINDOW_WIDTH = VIEWPORT.width;
const WINDOW_HEIGHT = VIEWPORT.height + 80;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    join(process.env.PROGRAMFILES || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    join(process.env['PROGRAMFILES(X86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith('--'));
const positional = args.filter((a) => !a.startsWith('--'));

const url = positional[0];
const outputPath = positional[1] || 'elements.json';
const autoClose = flags.includes('--close');

if (!url) {
  console.error('Usage: node inspect.mjs <url> [output.json] [--close]');
  process.exit(1);
}

const executablePath = findChrome();
if (!executablePath) {
  console.error('Chrome not found. Install Chrome or set CHROME_PATH env variable.');
  process.exit(1);
}

const outputDir = dirname(outputPath);
if (outputDir && outputDir !== '.' && !existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

console.log(`Chrome: ${executablePath}`);
console.log(`URL: ${url}`);
console.log(`Viewport: ${VIEWPORT.width}x${VIEWPORT.height} @${VIEWPORT.deviceScaleFactor}x`);

const browser = await puppeteer.launch({
  executablePath,
  headless: false,
  defaultViewport: null,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    `--window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT}`,
  ],
});

try {
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  // Wait for animations and dynamic content to settle
  await new Promise((r) => setTimeout(r, 2000));

  const elements = await page.evaluate(() => {
    const STYLE_KEYS = [
      'color',
      'backgroundColor',
      'fontSize',
      'fontFamily',
      'fontWeight',
      'lineHeight',
      'letterSpacing',
      'textAlign',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'marginTop',
      'marginRight',
      'marginBottom',
      'marginLeft',
      'gap',
      'borderTopLeftRadius',
      'borderTopRightRadius',
      'borderBottomLeftRadius',
      'borderBottomRightRadius',
      'borderTopWidth',
      'borderRightWidth',
      'borderBottomWidth',
      'borderLeftWidth',
      'borderTopColor',
      'borderRightColor',
      'borderBottomColor',
      'borderLeftColor',
      'display',
      'flexDirection',
      'alignItems',
      'justifyContent',
      'opacity',
      'overflow',
      'boxShadow',
    ];

    const SKIP_VALS = new Set([
      '',
      '0px',
      'none',
      'normal',
      'auto',
      'visible',
      'static',
      'start',
      'stretch',
      'baseline',
    ]);
    const SKIP_DEFAULTS = {
      color: 'rgb(0, 0, 0)',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      display: 'block',
      opacity: '1',
      fontWeight: '400',
    };

    function getStyles(el) {
      const cs = window.getComputedStyle(el);
      const s = {};
      for (const key of STYLE_KEYS) {
        const val = cs[key];
        if (!val || SKIP_VALS.has(val)) continue;
        if (SKIP_DEFAULTS[key] === val) continue;
        s[key] = val;
      }
      // Collapse identical border-radius
      const br = [
        s.borderTopLeftRadius,
        s.borderTopRightRadius,
        s.borderBottomLeftRadius,
        s.borderBottomRightRadius,
      ].filter(Boolean);
      if (br.length > 0 && new Set(br).size === 1) {
        s.borderRadius = br[0];
        delete s.borderTopLeftRadius;
        delete s.borderTopRightRadius;
        delete s.borderBottomLeftRadius;
        delete s.borderBottomRightRadius;
      }
      // Collapse identical padding
      const pd = [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].filter(Boolean);
      if (pd.length === 4 && new Set(pd).size === 1) {
        s.padding = pd[0];
        delete s.paddingTop;
        delete s.paddingRight;
        delete s.paddingBottom;
        delete s.paddingLeft;
      }
      // Collapse identical margin
      const mg = [s.marginTop, s.marginRight, s.marginBottom, s.marginLeft].filter(Boolean);
      if (mg.length === 4 && new Set(mg).size === 1) {
        s.margin = mg[0];
        delete s.marginTop;
        delete s.marginRight;
        delete s.marginBottom;
        delete s.marginLeft;
      }
      // Collapse identical border-width
      const bw = [s.borderTopWidth, s.borderRightWidth, s.borderBottomWidth, s.borderLeftWidth].filter(Boolean);
      if (bw.length > 0 && new Set(bw).size === 1) {
        s.borderWidth = bw[0];
        delete s.borderTopWidth;
        delete s.borderRightWidth;
        delete s.borderBottomWidth;
        delete s.borderLeftWidth;
      }
      // Collapse identical border-color
      const bc = [s.borderTopColor, s.borderRightColor, s.borderBottomColor, s.borderLeftColor].filter(Boolean);
      if (bc.length > 0 && new Set(bc).size === 1) {
        s.borderColor = bc[0];
        delete s.borderTopColor;
        delete s.borderRightColor;
        delete s.borderBottomColor;
        delete s.borderLeftColor;
      }
      // Shorten fontFamily to primary font only
      if (s.fontFamily) {
        s.fontFamily = s.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
      }
      return s;
    }

    function directText(el) {
      let t = '';
      for (const n of el.childNodes) {
        if (n.nodeType === 3) t += n.textContent;
      }
      return t.trim();
    }

    function walk(el, depth) {
      if (depth > 25) return null;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;

      const tag = el.tagName.toLowerCase();
      const text = directText(el);
      const styles = getStyles(el);
      const testId = el.getAttribute('data-testid');
      const role = el.getAttribute('role');
      const ariaLabel = el.getAttribute('aria-label');
      const imgSrc = tag === 'img' ? el.getAttribute('src') : undefined;

      const children = [];
      for (const child of el.children) {
        const r = walk(child, depth + 1);
        if (r) children.push(r);
      }

      const hasContent = text || imgSrc || tag === 'svg' || tag === 'img';
      const hasStyles = Object.keys(styles).length > 0;
      const hasIdentity = testId || role || ariaLabel;

      // Collapse pass-through wrappers
      if (!hasContent && !hasStyles && !hasIdentity) {
        if (children.length === 0) return null;
        if (children.length === 1) return children[0];
      }

      return {
        ...(tag !== 'div' && { tag }),
        ...(testId && { testId }),
        ...(role && { role }),
        ...(ariaLabel && { ariaLabel }),
        ...(text && { text }),
        ...(imgSrc && { img: imgSrc }),
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        },
        ...(hasStyles && { styles }),
        ...(children.length > 0 && { children }),
      };
    }

    return walk(document.body, 0);
  });

  // Count nodes for summary
  function countNodes(node) {
    if (!node) return 0;
    let c = 1;
    if (node.children) for (const ch of node.children) c += countNodes(ch);
    return c;
  }

  const output = {
    url,
    viewport: { width: VIEWPORT.width, height: VIEWPORT.height },
    extractedAt: new Date().toISOString(),
    tree: elements,
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2));

  const count = countNodes(elements);
  console.log(`\nExtracted ${count} elements → ${outputPath}`);

  if (autoClose) {
    await browser.close();
    console.log('Done.');
  } else {
    console.log('Browser kept open for manual review. Press Ctrl+C to close.');
    await new Promise(() => {});
  }
} catch (err) {
  console.error(`Inspection failed: ${err.message}`);
  await browser.close();
  process.exit(1);
}


export function template(titleString,contentString) {
  return `
    <!doctype html>
    <html lang="en">
      ${head(titleString)}
      <body>
      <div class="bar">${bar()}</div>
      ${body(titleString,contentString)}
      <div class="foot">${foot()}</div>
      </body>
    </html>
  `
}

export function article(objectList) {
  return objectList.map(item=>{
    return `
    <article class="article">
      <h2>${item.title ?? 'Untitled'}<sub>${item.subtitle ?? ''}</sub></h2>
      ${wrap(item.content)}
    </article>
  `}).join('')
}

export function log(objectList) {
  const it=(obj)=>objectList[obj].map(item=>
    li(JSON.stringify(item))
  ).join('')
  return Object.keys(objectList).map(obj=>`
    <article class="log">
      <h2>${obj}</h2>
      <ol>${it(obj)}</ol>
    </article>
  `).join('')
}

export function wrap(contentString) {
  if (contentString.startsWith('<') | contentString.endsWith('>'))
    return contentString
  return `<p>${contentString}</p>`
}

export function concatenate(...articleStringList) {
  return articleStringList.map(item=>`
    <div>${item}</div>
  `).join('\r\n')
}

const li=(itemString)=>{
  return `<li>${itemString}</li>`
}

const body=(titleString,contentString)=>{
  return `
    <div>
      <h1>${titleString}</h1>
      <hr/>
      <div class="content">${contentString}</div>
    </div>
  `
}

const bar=()=>`
  <a href="/">Yun Inze's Page</a>
  <a href="/article">Article</a>
  <a href="/testbed">Testbed</a>
`

const foot=()=>`
  2025-01-31
`

const head=(titleString)=>{
  return `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <title>${titleString}</title>
      <style>${style()}</style>
    </head>
  `
}

const styleWidthCommon='95%'
const style=()=>`
  @font-face {
    font-family: "PretendardWeb";
    font-display: swap;
    font-style: normal;
    font-weight: 45 920;
    src: url("https://github.com/orioncactus/pretendard/raw/refs/heads/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2") format('woff2-variations');
  }
  * {
    color: #000000;
    font-family: Pretendard, PretendardWeb, Serif;
    font-weight: 500;
  }
  body {
    width: ${styleWidthCommon};
  }
  h1,h2,h3,h4,h5 {
    margin: 1.7rem 1rem 0rem;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: #bbbbbb;
  }
  .bar {
    width: ${styleWidthCommon};
    overflow: auto;
    font-size: 1.2rem;
  }
  .bar a {
    margin: 1rem 1rem 1rem;
  }
  @media screen and (max-width: 400px) {
    .bar a {
      float: none;
      display: block;
    }
  }
  .content {
    margin: -0.8rem 1rem 1rem;
  }
  .article {
    width: ${styleWidthCommon};
    display: inline-block;
  }
  .article h2 a {
    text-decoration: none;
  }
  .article p {
    margin: 0.2rem 0.2rem 1rem 1.7rem;
  }
  .article a {
    text-decoration: underline;
    text-decoration-thickness: 0.01rem;
  }
  .article sub {
    margin: 0rem 0.5rem 0rem;
    font-size: 0.8rem;
  }
  .article u {
    text-decoration-thickness: 0.01rem;
  }
  .article li {
    margin: 0.5rem 0.2rem 0rem 4rem;
    font-size: 1rem;
    list-style-type: square;
    list-style-position: inside;
    text-indent: -1.4rem;
    padding-left: 2rem;
  }
  .article img {
    width: 20%;
    min-width: 340px;
    max-width: 400px;
    margin: 0.5rem 2.2rem 0.5rem 1rem;
    float: left;
  }
  .log {
    width: ${styleWidthCommon};
    font-size: 0.8rem;
  }
  .foot {
    width: ${styleWidthCommon};
    color: #bbbbbb;
    text-align: right;
  }
`

export default {
  template,
  article,
  log
}

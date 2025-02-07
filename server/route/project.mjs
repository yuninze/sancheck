
export function template(title,content) {
    return `
        <!doctype html>
        <html lang="en">
            ${head(title)}
            <body>
            <div class="bar">${bar()}</div>
            ${body(title,content)}
            <div class="foot">${foot()}</div>
            </body>
        </html>
    `
}

export function article(objList) {
    return objList.map(item=>{
        return `
            <article class="article">
                <h2>${item.title ?? 'Untitled'}<sub>${item.subtitle ?? ''}</sub></h2>
                ${item.content ?? 'Null Content'}
            </article>
        `
    }).join('')
}

export function log(objList) {
    const it=(obj)=>objList[obj].map(item=>
        li(JSON.stringify(item))
    ).join('')
    return Object.keys(objList).map(obj=>`
        <article class="log">
            <h2>${obj}</h2>
            <ol>${it(obj)}</ol>
        </article>
    `).join('')
}

const li=(item)=>{
    return `<li>${item}</li>`
}

const body=(title,content)=>{
    return `
        <div>
            <h1>${title}</h1>
            <hr/>
            <div class="content">${content}</div>
        </div>
    `
}

const img=(src,alt)=>{
    return `<img src=${src} alt=${alt}>`
}

const bar=()=>`
    <a href="/">Yun Inze's Page</a>
    <a href="/article">Article</a>
    <a href="/testbed">Testbed</a>
`

const foot=()=>{
    return `
        25-01-31
    `
}

const head=(title)=>{
    return `
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
            <title>${title}</title>
            <style>${style()}</style>
        </head>
    `
}

const styleWidthCommon='90%'
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
            width: 100%;
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
        hr {
            width: 100%;
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
            margin: 0rem 1rem 1rem;
        }
        .content a {
            text-decoration: none;
        }
        .article {
            width: ${styleWidthCommon};
            display: inline-block;
        }
        .article p {
            margin: 0.5rem 0.8rem 1rem 1.7rem;
        }
        .article a {
            text-decoration: underline;
            text-decoration-thickness: 0.1rem;
        }
        .article sub {
            margin: 0rem 0.5rem 0rem;
            font-size: 0.8rem;
        }
        .article li {
            margin: 0.5rem 1.7rem 0rem;
            font-size: 1rem;
            list-style-type: square;
        }
        .article img {
            width: 20%;
            min-width: 300px;
            max-width: 400px;
            margin: 0.5rem 1rem 0.5rem;
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
    log,
    article
}

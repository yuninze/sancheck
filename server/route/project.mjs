
export function template(title,content) {
    return `
        <!doctype html>
        <html lang="en">
            ${head(title)}
            <body>
            ${bar()}
            ${body(title,content)}
            ${foot()}
            </body>
        </html>
    `
}

export function article(objList) {
    return objList.map(item=>`
        <div class="content article">
            <h2>${item.title ?? 'Untitled'} <sub>${item.subtitle ?? ''}</sub></h2>
            <p>${item.content}</p>
        </div>
    `).join('')
}

export function log(objList) {
    const it=(obj)=>objList[obj].map(item=>
        li(JSON.stringify(item))
    ).join('')
    return Object.keys(objList).map(obj=>`
        <div class="content-log">
            <h2>${obj}</h2>
            <ol>${it(obj)}</ol>
        </div>
    `).join('')
}

const li=(item)=>{
    return `<li>${item}</li>`
}

const img=(src,alt)=>{
    return `<img src=${src} alt=${alt}>`
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
        h1,h2,h3,h4,h5 {
            margin: 1.7rem 1rem 0rem;
        }
        a {
            text-decoration: none;
        }
        a:hover {
            color: #cccccc;
        }
        .bar {
            width: 100%;
            overflow: auto;
        }
        .bar a {
            font-size: 1.2rem;
            margin: 1rem 1rem 1rem;
        }
        @media screen and (max-width: 600px) {
            .bar a {
                float: none;
                display: block;
            }
        }
        .content {
            margin: 1.7rem 1rem 0rem;
        }
        .article a {
            text-decoration: underline;
        }
        .article sub {
            font-size: 0.8rem;
            margin: 0rem 0.2rem 0rem;
        }
        .article p {
            font-size: 1rem;
            margin: 1rem 2rem 1rem;
        }
        .article li {
            font-size: 1rem;
            margin: 0rem 1.7rem 0rem;
            list-style-type: square;
        }
        .foot {
            color: #cccccc;
            margin: 1.7rem 1rem 0rem;
            text-align: right;
        }
    `

const bar=()=>`
    <div class="bar">
        <a href="/">Yun Inze's Page</a>
        <a href="/article">Article</a>
        <a href="/testbed">Testbed</a>
    </div>
`

const body=(title,content)=>{
    return `
        <div>
            <h1>${title}</h1>
            <hr/>
            <p class="content">${content}</p>
        </div>
    `
}

const foot=()=>{
    return `
        <div class="foot">
            250131
        </div>
    `
}

export default {
    template,
    log,
    article
}

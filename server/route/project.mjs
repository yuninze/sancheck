
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
        <article class="article">
            <h2>${item.title ?? 'Untitled'} <sub>${item.subtitle ?? ''}</sub></h2>
            ${item.content}
        </article>
    `).join('')
}

export function log(objList) {
    const it=(obj)=>objList[obj].map(item=>
        li(JSON.stringify(item))
    ).join('')
    return Object.keys(objList).map(obj=>`
        <article>
            <h2>${obj}</h2>
            <ol>${it(obj)}</ol>
        </article>
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
            position: relative;
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
            color: #bbbbbb;
        }
        .bar {
            width: 100%;
            overflow: auto;
            font-size: 1.2rem;
        }
        .bar a {
            margin: 1rem 1rem 1rem;
        }
        @media screen and (max-width: 500px) {
            .bar a {
                float: none;
                display: block;
            }
        }
        .content {
            margin: 1.7rem 1rem 0rem;
        }
        .content a {
            text-decoration: none;
        }
        .article {
            width: 100%;
        }
        .article p {
            margin: 0rem 1.7rem 0rem;
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
            margin: 0.2rem 1.7rem 0rem;
            font-size: 1rem;
            list-style-type: square;
            display: inline-block;
        }
        .article img {
            width: 20%;
            min-width: 300px;
            margin: 0.5rem 1rem 0.5rem;
            float: left;
            position: relative;
        }
        .log {
            font-size: 0.8rem
        }
        .foot {
            margin: 1.7rem 1rem 0rem;
            color: #bbbbbb;
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
            <h1>
                ${title}
            </h1>
            <hr/>
            <div class="content">
                ${content}
            </div>
        </div>
    `
}

const foot=()=>{
    return `
        <div class="foot">
            25-01-31
        </div>
    `
}

export default {
    template,
    log,
    article
}

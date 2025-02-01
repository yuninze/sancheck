

export const template=(head,body)=>{
    return `
        <!doctype html>
        <html lang="en">
            ${head}
            ${body}
        </html>
    `
}

export const head=(title)=>{
    return `
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="icon" type="image/x-icon" href="/favicon.ico">
            <title>${title}</title>
        </head>
    `
}

export const body=()=>{
    return `
        <body>
            <div>
                <h1>Working on it</h1>
                <hr>
                <h2>Be seen soon.</h2>
            </div>
        </body>
    `
}

export function sew(head,body) {
    return template(head,body)
}

export default {
    sew
}

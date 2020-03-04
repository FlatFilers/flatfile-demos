import React from 'react'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomDark} from "react-syntax-highlighter/dist/cjs/styles/prism";

export const ConfigHighlighter = (config) => {
    const configToCode = "import React, {Component} from \"react\";\n" +
        "import ReactDOM from \"react-dom\";\n" +
        "\n" +
        "import FlatfileImporter from \"flatfile-csv-importer\";\n" + "\nconst flatfileConfig = " + JSON.stringify(config.config, null, 2) + "\n" + "\n" +
        "const importer = new FlatfileImporter(LICENSE_KEY, flatfileConfig)"
    return (
        <div id="ide_sidebar" className="demo-half">
            <SyntaxHighlighter language="javascript" style={atomDark} showLineNumbers={true}>
                {configToCode}
            </SyntaxHighlighter>
        </div>
    )
}

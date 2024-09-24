const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function analyzeComponents(directory) {
    const reactDocs = await import('react-docgen');
    const files = glob.sync(`${directory}/**/*.{js,jsx}`);
    const components = {};

    for (const file of files) {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const componentInfo = reactDocs.parse(content);
            const componentName = path.basename(file, path.extname(file));
            
            components[componentName] = {
                name: componentName,
                props: Object.keys(componentInfo.props || {}),
                children: []
            };

            const importMatches = content.match(/import\s+(\w+)\s+from/g) || [];
            components[componentName].children = importMatches.map(match => match.split(' ')[1]);
        } catch (error) {
            console.warn(`Skipping ${file}: ${error.message}`);
        }
    }

    return components;
}

function generateMermaidDiagram(components) {
    let diagram = 'graph TD\n';
    Object.values(components).forEach(component => {
        component.children.forEach(child => {
            if (components[child]) {
                diagram += `    ${component.name} --> ${child}\n`;
            }
        });
        if (component.props.length > 0) {
            diagram += `    ${component.name} --> ${component.name}Props[${component.name} Props]\n`;
            component.props.forEach(prop => {
                diagram += `    ${component.name}Props --> ${component.name}_${prop}(${prop})\n`;
            });
        }
    });
    return diagram;
}


const projectRoot = './src'; 

(async () => {
    try {
        const components = await analyzeComponents(projectRoot);
        const mermaidDiagram = generateMermaidDiagram(components);
        console.log(mermaidDiagram);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
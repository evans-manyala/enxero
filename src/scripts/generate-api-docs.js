const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const { execSync } = require('child_process');
const swaggerSpec = require('../src/config/swagger').default;

const openapiPath = 'openapi.json';
const markdownPath = 'docs/api/openapi.md';

// Generate OpenAPI JSON
const spec = swaggerJSDoc(swaggerSpec);
fs.writeFileSync(openapiPath, JSON.stringify(spec, null, 2));
console.log(`✅ OpenAPI spec generated at ${openapiPath}`);

// Generate Markdown using widdershins
execSync(`npx widdershins ${openapiPath} -o ${markdownPath}`);
console.log(`✅ Markdown API docs generated at ${markdownPath}`);
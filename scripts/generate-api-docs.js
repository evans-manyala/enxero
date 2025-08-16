const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const { execSync } = require('child_process');
const swaggerModule = require('../dist/config/swagger');
const swaggerSpec = swaggerModule.default || swaggerModule.swaggerOptions || swaggerModule;
console.log('Swagger config loaded:', swaggerSpec);

const openapiPath = 'openapi.json';
const markdownPath = 'docs/api/openapi.md';

// If the loaded object is already an OpenAPI spec, write it directly
if (swaggerSpec.openapi && swaggerSpec.info && swaggerSpec.paths) {
  fs.writeFileSync(openapiPath, JSON.stringify(swaggerSpec, null, 2));
  console.log('✅ OpenAPI spec (pre-generated) written to', openapiPath);
} else if (swaggerSpec.definition) {
  // If it's swagger-jsdoc options, generate the spec
  const spec = swaggerJSDoc(swaggerSpec);
  fs.writeFileSync(openapiPath, JSON.stringify(spec, null, 2));
  console.log('✅ OpenAPI spec generated at', openapiPath);
} else {
  throw new Error('Swagger config is not in a recognized format.');
}

// Generate Markdown using widdershins
execSync(`npx widdershins ${openapiPath} -o ${markdownPath}`);
console.log(`✅ Markdown API docs generated at ${markdownPath}`); 
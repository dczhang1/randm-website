/**
 * Simple CSS Minifier for RANDM Lab Website
 * 
 * This script minimizes CSS files by removing comments, whitespace, and newlines.
 * Run this script in the browser console or Node.js environment.
 * 
 * Usage in browser console:
 * 1. Copy the contents of a CSS file
 * 2. Run minifyCSS(cssString)
 * 3. Copy the result and save it as a .min.css file
 */

function minifyCSS(css) {
    if (!css) return '';
    
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace around symbols
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;\}/g, '}')
        // Remove trailing semicolons
        .replace(/;\s*}/g, '}')
        // Remove unnecessary spaces
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/g, '')
        // Simplify zero values
        .replace(/(^|[^0-9])0px/g, '$10')
        // Trim
        .trim();
}

// Example usage in browser console:
// 1. const css = `/* Your CSS here */`;
// 2. const minified = minifyCSS(css);
// 3. console.log(minified);

// Node.js implementation (uncomment to use in Node)
/*
const fs = require('fs');
const path = require('path');

function minifyFile(inputPath, outputPath) {
    try {
        const css = fs.readFileSync(inputPath, 'utf8');
        const minified = minifyCSS(css);
        fs.writeFileSync(outputPath, minified);
        console.log(`Minified ${inputPath} -> ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`Error minifying ${inputPath}:`, error);
        return false;
    }
}

function minifyDirectory(directory) {
    try {
        const files = fs.readdirSync(directory);
        let successCount = 0;
        
        files.forEach(file => {
            if (path.extname(file) === '.css' && !file.includes('.min.css')) {
                const inputPath = path.join(directory, file);
                const outputPath = path.join(directory, file.replace('.css', '.min.css'));
                if (minifyFile(inputPath, outputPath)) {
                    successCount++;
                }
            }
        });
        
        console.log(`Successfully minified ${successCount} CSS files in ${directory}`);
    } catch (error) {
        console.error(`Error processing directory ${directory}:`, error);
    }
}

// Usage example:
// minifyDirectory('./css');
*/

// If running in a browser, add to window
if (typeof window !== 'undefined') {
    window.minifyCSS = minifyCSS;
} 
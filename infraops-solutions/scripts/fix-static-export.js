const fs = require("fs")
const path = require("path")

// Define the output directory
const outDir = path.join(__dirname, "..", "out")

// Function to copy a file
function copyFile(source, target) {
  fs.copyFileSync(source, target)
  console.log(`Copied ${source} to ${target}`)
}

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`Created directory: ${dirPath}`)
  }
}

// Main function
function fixStaticExport() {
  console.log("Fixing static export...")

  // Ensure the root index.html redirects to /en/
  if (fs.existsSync(path.join(outDir, "index.html"))) {
    console.log("Root index.html exists")
  } else {
    // Copy the public/index.html to the root if it doesn't exist
    const sourceIndex = path.join(outDir, "en", "index.html")
    const targetIndex = path.join(outDir, "index.html")

    if (fs.existsSync(sourceIndex)) {
      // Create a simple redirect HTML
      const redirectHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=/en/">
  <title>Redirecting...</title>
  <script>
    window.location.href = "/en/";
  </script>
</head>
<body>
  <p>Redirecting to <a href="/en/">English version</a>...</p>
</body>
</html>
      `

      fs.writeFileSync(targetIndex, redirectHtml)
      console.log(`Created redirect at ${targetIndex}`)
    } else {
      console.error(`Source index not found: ${sourceIndex}`)
    }
  }

  console.log("Static export fixed!")
}

// Run the function
fixStaticExport()

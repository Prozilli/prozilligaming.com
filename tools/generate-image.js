#!/usr/bin/env node
/**
 * Leonardo AI Image Generator for Prozilli
 *
 * Usage:
 *   node tools/generate-image.js "your prompt here" [output-filename]
 *
 * Examples:
 *   node tools/generate-image.js "cinematic dark theater interior" hero-about.png
 *   node tools/generate-image.js "abstract network visualization" prismai-hero.png
 */

const fs = require('fs');
const path = require('path');

const LEONARDO_API_KEY = '26afe699-edf1-4276-bebc-063e59baa368';
const API_BASE = 'https://cloud.leonardo.ai/api/rest/v1';

// Brand-aligned generation defaults using Flux
const DEFAULTS = {
  num_images: 1,
  width: 1472,  // 21:9 ultrawide for hero images
  height: 632,
  guidance_scale: 7,
  // Using Phoenix model for high quality
  modelId: '6b645e3a-d64f-4341-a6d8-7a3690fbf042', // Leonardo Phoenix
  // Prozilli brand style suffix
  style_suffix: ', cinematic lighting, dark navy and deep red color palette, subtle gold accents, film grain texture, moody atmospheric haze, professional photography, ultra high quality'
};

async function request(method, endpoint, body = null) {
  const url = `${API_BASE}${endpoint}`;

  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${LEONARDO_API_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'ProzilliImageGen/1.0'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Response:', text.substring(0, 500));
    throw new Error(`Failed to parse response: ${e.message}`);
  }
}

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generate(prompt, outputName) {
  console.log('\n🎬 Leonardo AI Image Generator for Prozilli\n');
  console.log(`📝 Prompt: "${prompt}"`);

  // Add brand style to prompt
  const fullPrompt = prompt + DEFAULTS.style_suffix;
  console.log(`🎨 Full prompt with style: "${fullPrompt}"\n`);

  // Start generation
  console.log('⏳ Starting generation...');
  const genResponse = await request('POST', '/generations', {
    prompt: fullPrompt,
    num_images: DEFAULTS.num_images,
    width: DEFAULTS.width,
    height: DEFAULTS.height,
    guidance_scale: DEFAULTS.guidance_scale,
    modelId: DEFAULTS.modelId,
    negative_prompt: 'text, watermark, logo, blurry, low quality, oversaturated, cartoon, anime, bright colors, white background'
  });

  if (!genResponse.sdGenerationJob) {
    console.error('❌ Failed to start generation:', JSON.stringify(genResponse, null, 2));
    process.exit(1);
  }

  const generationId = genResponse.sdGenerationJob.generationId;
  console.log(`✅ Generation started: ${generationId}`);

  // Poll for completion
  console.log('⏳ Waiting for generation to complete...');
  let attempts = 0;
  const maxAttempts = 60; // 2 minutes max

  while (attempts < maxAttempts) {
    await sleep(2000); // Check every 2 seconds
    attempts++;

    const statusResponse = await request('GET', `/generations/${generationId}`);
    const generation = statusResponse.generations_by_pk;

    if (!generation) {
      console.log(`   Attempt ${attempts}: waiting...`);
      continue;
    }

    const status = generation.status;
    console.log(`   Attempt ${attempts}: ${status}`);

    if (status === 'COMPLETE') {
      const images = generation.generated_images;
      if (!images || images.length === 0) {
        console.error('❌ No images generated');
        process.exit(1);
      }

      // Download the first image
      const imageUrl = images[0].url;
      const outputDir = path.join(__dirname, '..', 'public', 'images', 'heroes');

      // Ensure directory exists
      fs.mkdirSync(outputDir, { recursive: true });

      const outputPath = path.join(outputDir, outputName || `hero-${Date.now()}.png`);

      console.log(`\n📥 Downloading image...`);
      await downloadImage(imageUrl, outputPath);

      console.log(`\n✅ Image saved to: ${outputPath}`);
      console.log(`   Relative path: /images/heroes/${path.basename(outputPath)}`);
      return outputPath;
    }

    if (status === 'FAILED') {
      console.error('❌ Generation failed');
      process.exit(1);
    }
  }

  console.error('❌ Generation timed out');
  process.exit(1);
}

// Parse CLI args
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`
Leonardo AI Image Generator for Prozilli

Usage:
  node tools/generate-image.js "your prompt" [output-filename.png]

Examples:
  node tools/generate-image.js "cinematic movie theater interior, empty seats" hero-about.png
  node tools/generate-image.js "abstract AI neural network visualization" hero-prismai.png
  node tools/generate-image.js "professional gaming setup with multiple monitors" hero-gaming.png
  node tools/generate-image.js "cinematic roleplay scene, dark city street" hero-zo.png

Note: Images are saved to public/images/heroes/ and sized at 1472x632 (21:9 ultrawide)
Brand styling (dark navy, red, gold accents, film grain) is automatically added.
`);
  process.exit(0);
}

const prompt = args[0];
const outputName = args[1] || `hero-${Date.now()}.png`;

generate(prompt, outputName).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

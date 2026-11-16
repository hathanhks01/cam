import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height) {
  // We will draw a camera icon with dark slate background (#0f172a) and orange accents (#f97316)
  // Construct raw RGBA bitmap
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);

  const cx = width / 2;
  const cy = height / 2;
  const rOuter = width * 0.45;
  const rLens = width * 0.22;
  const rLensInner = width * 0.12;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      
      // Default background dark blue-gray #0f172a
      let r = 15, g = 23, b = 42, a = 255;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Camera body rectangle
      const bw = width * 0.76;
      const bh = height * 0.52;
      const bx = (width - bw) / 2;
      const by = (height - bh) / 2 + height * 0.04;

      // Top viewfinder bump
      const vbw = width * 0.28;
      const vbh = height * 0.14;
      const vbx = (width - vbw) / 2;
      const vby = by - vbh * 0.8;

      if (x >= vbx && x <= vbx + vbw && y >= vby && y <= by) {
        // Top bump orange-red
        r = 249; g = 115; b = 22;
      } else if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
        // Inside camera body
        // Border check
        const isBorder = (x - bx < 10 || bx + bw - x < 10 || y - by < 10 || by + bh - y < 10);
        if (isBorder) {
          r = 249; g = 115; b = 22; // Orange border
        } else {
          r = 30; g = 41; b = 59; // Dark gray body
        }
      }

      // Small flash / red dot
      const dotX = bx + 36 * (width / 512);
      const dotY = by + 36 * (height / 512);
      const dotDist = Math.sqrt((x - dotX) * (x - dotX) + (y - dotY) * (y - dotY));
      if (dotDist < 12 * (width / 512)) {
        r = 239; g = 68; b = 68; // Red dot
      }

      // Lens outer ring
      if (dist <= rLens) {
        if (dist > rLens - 14 * (width / 512)) {
          r = 249; g = 115; b = 22; // Orange ring
        } else if (dist <= rLensInner) {
          r = 2; g = 132; b = 199; // Cyan glass
          // Small glare
          if (dx < -6 * (width / 512) && dy < -6 * (height / 512) && dist < rLensInner * 0.6) {
            r = 255; g = 255; b = 255;
          }
        } else {
          r = 15; g = 23; b = 42; // Deep black/slate lens ring
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // Color type 6: RGBA
  ihdr.writeUInt8(0, 10); // Compression method
  ihdr.writeUInt8(0, 11); // Filter method
  ihdr.writeUInt8(0, 12); // Interlace method

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);

    // CRC32
    let crc = 0xffffffff;
    for (let i = 0; i < 4 + len; i++) {
      const byte = buf[4 + i];
      crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
    crc = (crc ^ 0xffffffff) >>> 0;
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', compressed);
  const ihdrChunk = makeChunk('IHDR', ihdr);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idat, iendChunk]);
}

// Precomputed CRC table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

const outDir = path.resolve('public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), createPng(192, 192));
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), createPng(512, 512));
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), createPng(180, 180));
console.log('Icons generated successfully!');


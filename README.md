# 燃烧 (BURN) - Chinese Dragon Token Viewer

A beautiful Chinese-themed web-based 3D dragon viewer with live token statistics tracking.

## Features

- 🐉 Animated 3D Chinese Dragon model
- 🔥 Live BEP-20 token stats (Market Cap, Supply, Holders)
- 🎨 Traditional Chinese luck-themed design (red & gold)
- 📊 Real-time data updates every 30 seconds
- 🖱️ Interactive 3D controls
- 📱 Responsive design
- 🚀 Ready for Railway deployment

## Important: Model Files

⚠️ **The 3D model files (FBX, GLB, TGA) are NOT included in this repository** due to GitHub's file size limits (over 100MB each).

You need to download them separately and place them in the correct folders:
- Place FBX animation files in `/assets/Style_one/`
- Place texture files (.tga) in `/assets/uploads_files_5116320_textures/`
- The app uses `ANIM_Chinese_Dragon_Flying.fbx` by default

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Controls

- **Rotate**: Left click + drag
- **Pan**: Right click + drag
- **Zoom**: Mouse wheel scroll

## Deploying to Railway

### Option 1: Railway CLI

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize and deploy:
```bash
railway init
railway up
```

### Option 2: Railway Dashboard

1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo" (or use "Deploy from local directory")
4. Connect your repository
5. Railway will automatically detect the Node.js project and deploy it
6. Your app will be available at the provided Railway URL

### Important Notes for Railway:

- The `PORT` environment variable is automatically set by Railway
- The `package.json` includes the required `engines` field
- The start script is configured for production deployment
- No Procfile needed - Railway auto-detects Node.js apps

## Project Structure

```
bnburn/
├── assets/
│   └── chinese_dragon.glb    # Your 3D model file
├── public/
│   └── index.html             # Main HTML with Three.js viewer
├── server.js                  # Express server
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Tech Stack

- **Frontend**: HTML5, Three.js (via CDN)
- **Backend**: Node.js + Express
- **3D Rendering**: Three.js with GLTFLoader
- **Deployment**: Railway-ready configuration

## Customization

To customize the viewer, edit `public/index.html`:

- **Colors**: Modify `scene.background` and gradient values
- **Lighting**: Adjust light positions and intensities
- **Camera**: Change initial camera position
- **Animation**: Modify rotation speed in the animate loop

## Troubleshooting

If the model doesn't load:
- Check that `chinese_dragon.glb` is in the `assets` folder
- Check browser console for error messages
- Ensure the server is running on the correct port
- Verify the model file is not corrupted

## License

MIT


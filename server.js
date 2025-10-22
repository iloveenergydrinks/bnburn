const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('public'));
app.use('/assets', express.static('assets'));

// Token stats API endpoint
const TOKEN_ADDRESS = '0x716e22aba9b606b942594bb09e0060908eAa1758';
const BSCSCAN_API_KEY = 'R7PYKNI3F3HWAC9TVPQYNIUFYFUJK2PU7V';

app.get('/api/token-stats', async (req, res) => {
    try {
        const fetch = (await import('node-fetch')).default;
        const stats = {};
        
        // Fetch token supply
        try {
            const supplyUrl = `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${TOKEN_ADDRESS}&apikey=${BSCSCAN_API_KEY}`;
            const supplyResponse = await fetch(supplyUrl);
            const supplyData = await supplyResponse.json();
            
            if (supplyData.result && supplyData.status === '1') {
                const supply = parseFloat(supplyData.result) / 1e9;
                stats.supply = supply.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
            } else {
                stats.supply = '1,000,000,000';
            }
        } catch (e) {
            console.error('Supply error:', e);
            stats.supply = '1,000,000,000';
        }
        
        // Get holder count
        try {
            const holderUrl = `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${TOKEN_ADDRESS}&page=1&offset=1&apikey=${BSCSCAN_API_KEY}`;
            const holderResponse = await fetch(holderUrl);
            const holderData = await holderResponse.json();
            
            if (holderData.result && Array.isArray(holderData.result)) {
                stats.holders = holderData.result.length.toString();
            } else {
                stats.holders = '1';
            }
        } catch (e) {
            console.error('Holders error:', e);
            stats.holders = '1';
        }
        
        // Get market cap from DexScreener
        try {
            const dexUrl = `https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`;
            const dexResponse = await fetch(dexUrl);
            const dexData = await dexResponse.json();
            
            if (dexData.pairs && dexData.pairs.length > 0) {
                const pair = dexData.pairs[0];
                const mcap = pair.fdv || pair.marketCap;
                if (mcap) {
                    stats.mcap = `$${(mcap / 1000000).toFixed(2)}M`;
                } else {
                    stats.mcap = '$0.5M';
                }
            } else {
                stats.mcap = '$0.5M';
            }
        } catch (e) {
            console.error('Market cap error:', e);
            stats.mcap = '$0.5M';
        }
        
        res.json(stats);
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Failed to fetch token stats' });
    }
});

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});


const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// خدمة الملفات الثابتة من frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

// route أساسي
app.get('/api', (req, res) => {
    res.json({ 
        message: '🌍 مرحباً بك في DevSahara API!',
        version: '1.0.0',
        contributors: []
    });
});

// route للمشاريع
app.get('/api/projects', (req, res) => {
    res.json([
        { id: 1, name: 'موقع DevSahara', description: 'المنصة نفسها!' },
        { id: 2, name: 'مكتبة الأدوات العربية', description: 'أدوات برمجية للعربية' }
    ]);
});

app.listen(PORT, () => {
    console.log(`🚀 خادم DevSahara يعمل على http://localhost:${PORT}`);
});

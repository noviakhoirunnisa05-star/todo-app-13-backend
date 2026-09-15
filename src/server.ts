import app from './app.js';

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
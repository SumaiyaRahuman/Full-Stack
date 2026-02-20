const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BMI Calculator</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 60px auto; background: #f0f4f8; }
        h2 { text-align: center; color: #333; }
        form { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        input { width: 100%; padding: 10px; margin: 8px 0 16px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; }
        button { width: 100%; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
        button:hover { background: #45a049; }
        label { font-weight: bold; color: #555; }
      </style>
    </head>
    <body>
      <h2>BMI Calculator</h2>
      <form action="/bmicalculator" method="POST">
        <label>Name:</label>
        <input type="text" name="Name" placeholder="Enter your name" required />
        <label>Height (m):</label>
        <input type="number" name="Height" step="0.01" placeholder="e.g. 1.75" required />
        <label>Weight (kg):</label>
        <input type="number" name="Weight" step="0.1" placeholder="e.g. 70" required />
        <button type="submit">Calculate BMI</button>
      </form>
    </body>
    </html>
  `);
});

app.post('/bmicalculator', (req, res) => {
  const name = req.body.Name;
  const heigh = parseFloat(req.body.Height);
  const weigh = parseFloat(req.body.Weight);
  const bmi = weigh / (heigh * heigh);

  let category, color;
  if (bmi < 18.5) { category = 'Underweight'; color = '#3498db'; }
  else if (bmi < 25) { category = 'Normal'; color = '#2ecc71'; }
  else if (bmi < 30) { category = 'Overweight'; color = '#f39c12'; }
  else { category = 'Obese'; color = '#e74c3c'; }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>BMI Result</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 60px auto; background: #f0f4f8; }
        .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
        .bmi-value { font-size: 48px; font-weight: bold; color: ${color}; }
        .category { font-size: 22px; color: ${color}; margin: 10px 0; }
        a { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>Hello, ${name}!</h2>
        <p>Your BMI is:</p>
        <div class="bmi-value">${bmi.toFixed(2)}</div>
        <div class="category">${category}</div>
        <table style="margin: 20px auto; text-align:left; font-size:13px; color:#666;">
          <tr><td>Underweight&nbsp;&nbsp;</td><td>&lt; 18.5</td></tr>
          <tr><td>Normal</td><td>18.5 – 24.9</td></tr>
          <tr><td>Overweight</td><td>25 – 29.9</td></tr>
          <tr><td>Obese</td><td>&ge; 30</td></tr>
        </table>
        <a href="/">Calculate Again</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
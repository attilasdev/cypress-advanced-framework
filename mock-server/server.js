const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your-secret-key';

app.use(express.static('public'));

// Mock Data
const mockData = {
  users: [
    {
      id: 1,
      email: "test@example.com",
      password: "password123",
      name: "Test User"
    }
  ],
  products: [
    {
      id: 1,
      name: "Product 1",
      price: 99.99,
      description: "Test product description"
    },
    {
      id: 2,
      name: "Product 2",
      price: 149.99,
      description: "Another test product"
    }
  ],
  orders: [
    {
      id: 1,
      userId: 1,
      products: [
        {
          productId: 1,
          quantity: 2
        }
      ],
      status: "pending"
    }
  ]
};

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockData.users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h'
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// Product Routes
app.get('/products', (req, res) => {
  res.json(mockData.products);
});

app.get('/products/:id', (req, res) => {
  const product = mockData.products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Order Routes
app.get('/orders', authenticateToken, (req, res) => {
  res.json(mockData.orders);
});

app.get('/orders/:id', authenticateToken, (req, res) => {
  const order = mockData.orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

app.post('/orders', authenticateToken, (req, res) => {
  const newOrder = {
    id: mockData.orders.length + 1,
    userId: req.user.id,
    products: req.body.products,
    status: 'pending'
  };
  mockData.orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
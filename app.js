const express = require('express');

// Routers
const { userRoutes } = require('./routes/users.routes');
const { productRoutes } = require('./routes/products.routes');
const { categoryRoutes } = require('./routes/categories.routes');
const { cartRoutes } = require('./routes/cart.routes');

const { globalErrorHandler } = require('./controllers/error.controller');
const { AppError } = require('./utils/appError.utils');

const app = express();

app.use(express.json());

// Endponits
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);

app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} Not Found in this Server`,
			404
		)
	);
});

// global Error Handler
app.use(globalErrorHandler);

module.exports = { app };

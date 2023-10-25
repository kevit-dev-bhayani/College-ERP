const authorize = (role: string[]) => {
	return (req, res, next) => {
		if (!role.includes(req.role)) {
			res.status(403).send('Forbidden');
			return;
		}

		next();
	};
};

export default authorize;

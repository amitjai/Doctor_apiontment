import jwt from 'jsonwebtoken';

export default async (req, res, next) => {

    try {
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                return res.status(201).json({message: "Auth failed.", success: false, err});
            } else {
                req.body.userId = decode.id;
                next();
            }
        });
    } catch(error) {
        res.status(500).json({message: "Auth failed.", success: false, error});
    }
};
import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwtService";
import { decode } from "punycode";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){

const authorizationHeader = req.headers.authorization

if(!authorizationHeader) return res.status(401).json({
    message: "Não autorizado: nenhum token encontrado"
});

const token = authorizationHeader.replace(/Bearer /, "");

jwtService.verifyToken(token, (err, decoded)=>{

    if(err || typeof decoded === "undefined") return res.status(401).json({
        message: "Não autorizado: token inválido"
    });

    userService.findByEmail((decoded as JwtPayload).email).then(user=>{
        req.user = user;
        next()
    })

})


}
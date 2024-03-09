import { Router } from "express";
import { getAllUsers, logoutUser, userLogin, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, logoutUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map
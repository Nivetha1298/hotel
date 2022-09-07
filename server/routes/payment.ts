import * as express from "express"
import{payment} from "../controllers/payment";
const router =express.Router();
router.post("/" , payment)

export default router;
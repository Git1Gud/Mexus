import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createAdmin,
    updateAdmin as updateAdminDetails,
    getAdmin as getAdminDetails,
    deleteAdmin ,

} from "../controllers/admin.controller.js";

// import 
    import { createOrUpdateInventory } from "../controllers/inventory.controller.js";

const router = Router();

router.use(verifyJWT);

// Route for registering an admin
router.route("/register").post( createAdmin,);

// Route for getting admin details
router.route("/details").get(getAdminDetails);

// Route for updating admin details
router.route("/update-admin-details").patch(updateAdminDetails);

// Route for updating hospital status (beds, oxygen cylinders, etc.)
router.route("/update-inventory").patch(createOrUpdateInventory);  

export { router };

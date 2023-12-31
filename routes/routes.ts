import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import * as controller from "../controllers/controller.ts";

const router: Router = new Router();

router.post("/create-user", controller.createUser);

router.get("/find-user/:username", controller.findUser);

router.post("/add-book", controller.addBook);

export default router;

import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const payload = {
    ok: true,
    atlasUriEnv: !!process.env.ATLAS_URI,
  };
  res.send(payload).status(200);
});

export default router;

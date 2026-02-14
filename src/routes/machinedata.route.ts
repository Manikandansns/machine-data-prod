import { Hono } from "hono";
import { prisma } from "../prisma";

const app = new Hono();

app.post("/machine-data", async (c) => {
  try {
    const body = await c.req.json();

    console.log("Incoming Data:", body); 

    const data = await prisma.machineData.create({
      data: {
        temp: Number(body.temp),
        humidity: Number(body.humidity),
        voltage: Number(body.voltage),
        current: Number(body.current),
        frequency: Number(body.frequency),
        pf: Number(body.pf),
        power: Number(body.power),
        energy: Number(body.energy),
        volume: Number(body.volume),
        percentage: Number(body.percentage),
        plc_error_id: Number(body.plc_error_id),
      },
    });

    return c.json(data);

  } catch (error) {
    console.error("POST ERROR:", error); // 👈 SEE REAL ERROR
    return c.json({ error: "Internal Server Error" }, 500);
  }
});


app.get("/machine-data", async (c) => {
  try {
    const data = await prisma.machineData.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 100, // latest 100 records
    });

    return c.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    return c.json(
      { error: "Internal Server Error" },
      500
    );
  }
});

export { app as machineDataRoutes };

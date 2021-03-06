import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { markingSchemasRouter } from "./routers/marking-schemas.router";
import { dbService } from "./services/db.service";
import { supervisorsRouter } from "./routers/supervisors.router";
import { researchFieldsRouter } from "./routers/research-fields.router";
import { studentsRouter } from "./routers/students.router";
import { projectsRouter } from "./routers/projects.router";
import { groupsRouter } from "./routers/groups.router";
import { submissionsRouter } from "./routers/submission.router";
import { templatesRouter } from "./routers/template.router";
import { usersRouter } from "./routers/users.router";
import { authRouter } from "./routers/auth.router";
import { panelMemberRouter } from "./routers/panel-member.router";

dotenv.config();

const main = async () => {
	const port = process.env.PORT;
	const app = express();

	// add middlewares
	app.use(morgan("dev"));
	app.use(
		cors({
			origin: process.env.FRONT_END,
		})
	);
	app.use(
		bodyParser.json({
			limit: "10mb",
		})
	);

	// server static files
	app.use(express.static("public"));

	// connect to DB
	await dbService.connect();

	// add routers
	app.use("/marking_schemas", markingSchemasRouter);
	app.use("/supervisors", supervisorsRouter);
	app.use("/research_fields", researchFieldsRouter);
	app.use("/students", studentsRouter);
	app.use("/projects", projectsRouter);
	app.use("/groups", groupsRouter);
	app.use("/submissions", submissionsRouter);
	app.use("/templates", templatesRouter);
	app.use("/users", usersRouter);
	app.use("/auth", authRouter);
	app.use("/panel_members", panelMemberRouter);

	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	});
};

main().catch((err) => {
	console.error("Error occured:", err);
});

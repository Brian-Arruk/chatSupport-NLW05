import { Router } from "express"
import { MessagesController } from "./controllers/MessagesControler";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";

const routes = Router();

/**
 * Tipos de parametros
 * Routes Params => parametros de rotas
 * http://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 * http://localhost:3333/settings/1?search=algumacoisa
 * 
 * Body Params => {
 * 
 * }
 */

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesConttroler = new MessagesController()

routes.post("/settings", settingsController.create)
routes.post("/users", usersController.create)
routes.post("/messages", messagesConttroler.create)
routes.get("/messages/:id", messagesConttroler.showByUser)



export { routes }
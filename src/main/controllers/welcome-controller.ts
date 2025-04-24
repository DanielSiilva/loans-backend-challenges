import welcomeUsecase from "../usecases/welcome-usecase";

class WelcomeController {
  async execute() {
    const response = await welcomeUsecase.execute({ data: "Ok Server" });
    return response;
  }
}

export default new WelcomeController();

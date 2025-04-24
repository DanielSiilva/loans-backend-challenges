interface InputWelcome {
  data: any;
}

class WelcomeUseCase {
  execute({ data }: InputWelcome) {
    return data;
  }
}

export default new WelcomeUseCase();

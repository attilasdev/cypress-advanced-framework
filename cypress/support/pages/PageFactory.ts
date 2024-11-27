import { LoginPage } from './LoginPage';

export class PageFactory {
  private static pages: Map<string, any> = new Map();

  static getLoginPage(): LoginPage {
    const pageName = 'login';
    if (!this.pages.has(pageName)) {
      this.pages.set(pageName, new LoginPage());
    }
    return this.pages.get(pageName);
  }
}
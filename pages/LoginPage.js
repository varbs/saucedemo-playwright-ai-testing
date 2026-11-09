// @ts-check
const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');

    this.productTitle = page.getByTestId('title');
    this.inventoryList = page.getByTestId('inventory-list');
  }

  async open() {
    await this.goto('/');
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyValidLogin(){
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.productTitle).toHaveText('Products');
    await expect(this.inventoryList).toBeVisible();
  }

  async verifyErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('Sorry, this user has been locked out');
  }
}

module.exports = { LoginPage };

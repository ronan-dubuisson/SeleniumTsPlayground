import { By, Locator, WebDriver } from "selenium-webdriver";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage{
//General page info
private readonly PAGE_TITLE: string = 'Swag Labs';
private readonly LOGIN_TIMEOUT = 10000; //in milliseconds

//Locators
private readonly pageHeader: Locator = By.className("title");
private readonly pageMenu: Locator = By.id("react-burger-menu-btn");
private readonly menuListItems: Locator = By.className("bm-item-list");
private readonly shoppingCartList: Locator = By.className("shopping_cart_link");
private readonly shoppintCartBadge: Locator = By.className("shopping_cart_badge");
private readonly cartList: Locator = By.className("cart_list");
private readonly continueShoppingBtn: Locator = By.id("continue-shopping");
private readonly checkoutBtn: Locator = By.id("checkout");


constructor(driver: WebDriver){
    super(driver);
}
}
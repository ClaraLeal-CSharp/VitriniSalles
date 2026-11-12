import "./styles/main.css";
import { applyBrandContent } from "./scripts/brand-content.js";
import { initializeNavigation } from "./scripts/navigation.js";
import { initializeInterestBag } from "./scripts/interest-bag.js";
import { initializeProductCatalog } from "./scripts/render-products.js";

applyBrandContent();
const interestBag = initializeInterestBag();
initializeProductCatalog(interestBag);
initializeNavigation();

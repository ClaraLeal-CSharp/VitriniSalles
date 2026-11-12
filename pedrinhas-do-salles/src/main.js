import "./styles/main.css";
import { applyBrandContent } from "./scripts/brand-content.js";
import { initializeNavigation } from "./scripts/navigation.js";
import { initializeProductCatalog } from "./scripts/render-products.js";

applyBrandContent();
initializeProductCatalog();
initializeNavigation();

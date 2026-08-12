import { useState } from "react";
import EcommerceHeader from "../../components/organisms/ecommerce/EcommerceHeader";
import EcommerceFooter from "../../components/organisms/ecommerce/EcommerceFooter";
import EcommerceHome from "./EcommerceHome";
import ProductsPage from "./ProductsPage";
import ProductDetails from "./ProductDetails";
import CartPage from "./CartPage";

export default function EcommercePage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (productId) => {
    setSelectedProduct(productId);
    setCurrentPage("product-details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => item.id === productId ? { ...item, qty: newQty } : item));
  };

  const handleRemove = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleCartClick = () => {
    setCurrentPage("cart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <EcommerceHome onNavigate={handleNavigate} onProductClick={handleProductClick} />;
      case "products":
        return <ProductsPage onProductClick={handleProductClick} />;
      case "product-details":
        return <ProductDetails productId={selectedProduct} onBack={() => handleNavigate("products")} onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
      case "cart":
        return <CartPage cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemove} onNavigate={handleNavigate} />;
      default:
        return <EcommerceHome onNavigate={handleNavigate} onProductClick={handleProductClick} />;
    }
  };

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      <EcommerceHeader cartCount={cart.reduce((sum, item) => sum + item.qty, 0)} onCartClick={handleCartClick} onNavigate={handleNavigate} currentPage={currentPage} />
      {renderPage()}
      <EcommerceFooter />
    </div>
  );
}

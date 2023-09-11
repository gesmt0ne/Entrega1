class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }

    generateUniqueId() {
      return (Math.random().toString(36).substring(2) + Date.now().toString(36));
    }
  
    addProduct(productData) {
      const { code } = productData;
  
      if (this.products.some(product => product.code === code)) {
        throw new Error("El código de producto ya está en uso.");
      }
  
      const newProduct = { id: this.generateUniqueId(), ...productData };
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
      return product;
    }
  }
  
  const productManager = new ProductManager();
  
  console.log(productManager.getProducts());
  
  try {
    const newProduct = productManager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });
    console.log("Producto agregado:", newProduct);
  } catch (error) {
    console.error("Error al agregar el producto:", error.message);
  }
  
  console.log(productManager.getProducts());
  
  try {
    productManager.addProduct({
      title: "producto repetido",
      description: "Este producto tiene el mismo código",
      price: 300,
      thumbnail: "Otra imagen",
      code: "abc123",
      stock: 10,
    });
  } catch (error) {
    console.error("Error al agregar el producto repetido:", error.message);
  }
  
  try {
    const productById = productManager.getProductById(newProduct.id);
    console.log("Producto encontrado por ID:", productById);
  } catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
  }
  
  try {
    const noExistenteEnProduct = productManager.getProductById("no_existe");
    console.log("Producto encontrado por ID:", noExistenteEnProduct);
  } catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
  }
  
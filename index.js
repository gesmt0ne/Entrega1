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
    const { title, description, price, thumbnail, code, stock } = productData;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }

    const { products } = this;

    if (products.some(product => product.code === code)) {
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
      title: "Producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25
    });
    console.log("Producto agregado exitosamente!:", newProduct);

    const productById = productManager.getProductById(newProduct.id)
    console.log("Producto encontrado por ID", productById)

    const noExisteEnProduct = productManager.getProductById("no_existe");
    console.log("Producto encontrado por ID:", noExisteEnProduct);
  } catch (error) {
    console.error(`[ERROR]: ${error.message}`);
  }
  
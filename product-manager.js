const fs = require('fs')

class ProductManager {
    constructor(path){
        this.path = path;
    }
    
    counter = 1;

    getProducts(){
            if(fs.existsSync(this.path)){
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            }else{
                fs.writeFileSync(this.path, JSON.stringify(productsArray));
                return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            }
        }
    
    addProducts(title, description, price, thumbnail, code, stock){
        let product = {
            id:this.counter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        productsArray.push(product);
        fs.writeFileSync(this.path, JSON.stringify(productsArray));
        this.counter += 1;
        console.log("Product added succesfully!")
    }

    deleteProducts(id){
        let product = productsArray.find(product => product.id === id);
        if(!product){
            console.log(`ERROR: There is no product with that ID! (${id})`);
        }else{
            productsArray = productsArray.filter(product => product.id !== id);
            console.log(`Product with ID ${id} deleted successfully. RIP ${product.title} :(`);
            fs.writeFileSync(this.path, JSON.stringify(productsArray));
        }
    }

    getProductById(id){
        const product = productsArray.find(product => product.id === id);
        if (!product){
        console.log("ERROR: Product not found!");
        }else{
            return product;
        }
    }

    updateProduct(id, property, newValue){
        const product = productsArray.find(product => product.id === id);
        switch(property){
            case 'id':
                console.log("ERROR: You can't change a product's code! Try changing another thing.");
                break;
            case 'title':
                product.title = newValue;
                fs.writeFileSync(this.path, JSON.stringify(productsArray));
                console.log(`${property} was changed to ${newValue} succesfully!`)
                break;
            case 'description':
                product.description = newValue;
                fs.writeFileSync(this.path, JSON.stringify(productsArray));
                console.log(`${property} was changed to ${newValue} succesfully!`)
                break;
            case 'price':
                product.price = newValue;
                fs.writeFileSync(this.path, JSON.stringify(productsArray));
                console.log(`${property} was changed to ${newValue} succesfully!`)
                break;
            case 'thumbnail':
                product.thumbnail = newValue;
                fs.writeFileSync(this.path, JSON.stringify(productsArray));
                console.log(`${property} was changed to ${newValue} succesfully!`)
                break;
            case 'code':
                console.log("ERROR: You can't change a product's code! Try changing another thing.");
                break;
            case 'stock':
                product.stock = newValue;
                fs.writeFileSync(this.path, JSON.stringify(productsArray));
                console.log(`${property} was changed to ${newValue} succesfully!`)
                break;
        }
    }
}

let productsArray = [];

let manager = new ProductManager('./file.txt')

/* ---------------------- MUESTRA EL ARRAY DE PRODUCTOS --------------------- */
console.log(manager.getProducts())

/* ------------------------ AÑADE 4 PRODUCTOS NUEVOS Y LOS MUESTRA EN CONSOLA DENTRO DEL ARRAY ------------------------ */
manager.addProducts("Peluche de Pou", "Un peluche del personaje Pou, del juego móvil 'Pou'.", 23.5, "NO IMAGE", Math.round(Math.random() * 9999999), 100);
manager.addProducts("Jet privado", "Un jet privado bla bla bla muy bueno muy rapido bla bla.", 899999, "NO IMAGE", Math.round(Math.random() * 9999999), 15);
manager.addProducts("Victoria II", "Victoria II, un videojuego de estrategia geopolítica, economía y guerra desarrollado por Paradox Interactive.", 3, "NO IMAGE", Math.round(Math.random() * 9999999), 9999999999999);
manager.addProducts("Buzo negro", "Buzo negro de segunda mano, en perfecto estado y sin manchas de ningún tipo. Talle XL.", 11, "NO IMAGE", Math.round(Math.random() * 9999999), 1);
//Hay una probabilidad de 1 entre 10 millones de que el code salga repetido, puedo hacer un sistema para que nunca suceda pero... la verdad que no lo veo
//necesario ahora mismo.

console.log(manager.getProducts());

/* ---------- MUESTRA EN CONSOLA LA INFORMACIÓN DEL PELUCHE DE POU ---------- */
console.log(manager.getProductById(1));

/* ----- ACTUALIZA LA INFORMACIÓN DE VICTORIA 2 Y LO MUESTRA EN CONSOLA ----- */
manager.updateProduct(3, 'title', 'Victoria 3');
manager.updateProduct(3, 'description', 'Victoria 3, el nuevo juego de Paradox Interactive, es la secuela del legendario Victoria II.');

console.log(manager.getProductById(3));

/* ---------------------------- BORRA EL JET PRIVADO --------------------------- */
console.log(manager.deleteProducts(2));

//Lo escribí de 0 para ejercitar mi lógica, estuvo divertido!!
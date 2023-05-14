import React from "react";
import "./App.css";
// import CartItem from './CartItem';
import Cart from "./Cart";
import Navbar from "./Navbar";
import {
  collection,
  getFirestore,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import firebaseApp from "./index";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
  }

  // componentDidMount() {
  //   firebase
  //     .firestore()
  //     .collection("products")
  //     .get()
  //     .then(snapshot => {
  //       const products = snapshot.docs.map(doc => {
  //         const data = doc.data();
  //         data["id"] = doc.id;
  //         return data;
  //       });
  //       this.setState({ products: products, loading: false });
  //     });
  // }

  componentDidMount() {
    const db = getFirestore(firebaseApp);
    const dbref = collection(db, "products");
    onSnapshot(dbref, (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
      this.setState({
        products,
        loading: false,
      });
    });
  }

  handleIncreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "products", products[index].id);
    await updateDoc(docRef, {
      qty: products[index].qty + 1,
    });
  };

  handleDecreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "products", products[index].id);
    await updateDoc(docRef, {
      qty: products[index].qty - 1,
    });
  };

  handleDeleteProduct = async (id) => {
    const db = getFirestore(firebaseApp);
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
  };

  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        img: "",
        price: 900,
        qty: 3,
        title: "Washing Machine",
      })
      .then((docRef) => {
        docRef.get().then((snapshot) => {
          console.log("Product has been added", snapshot.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        {/* <button onClick={this.addProduct} style={{ padding: 20, fontSize: 20 }}>
          Add a Product
        </button> */}
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={styles.total}>TOTAL : {this.getcartTotal()}</div>
      </div>
    );
  }
}
const styles = {
  total: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 30,
    padding: 10,
    height: 60,
    background: "#4267b2",
  },
};
export default App;

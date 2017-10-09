var Product = React.createClass({
  getInitialState: function() {
    return {qty: 0};
  },
  
  buy: function() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  },
  
  show: function() {
    this.props.handleShow(this.props.name);
  },
  
  render: function () {
    return (
      <div>
        <p>{this.props.name} - ${this.props.price}</p>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <h3>qty: {this.state.qty} item(s)</h3>
        <hr/>
      </div>
    );
  }
});

var Total = React.createClass({
  render: function() {
    return (
      <div>
        <h3>Total cash: ${this.props.total}</h3>
      </div>
    );
  }
  
});

var ProductForm = React.createClass({
  submit: function(e) {
    e.preventDefault();
    
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    }
    
    this.props.handleCreate(product);
    
    this.refs.name.value = "";
    this.refs.price.value = "";
  },
  
  render: function() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" placeholder="product name" ref="name"/> - 
        <input type="text" placeholder="product price" ref="price"/>
        <br/><br/>
        <button>create product</button>
        <hr/>
      </form>
    );
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      total: 0,
      productList: [
        {name: "Android", price: 121},
        {name: "Apple", price: 200},
        {name: "Nokia", price: 54}
        ]
    };
  },
  
  createProduct: function(product) {
    this.setState({
      productList: this.state.productList.concat(product)
    })
  },
  
  calculateTotal: function(price) {
    this.setState({total: this.state.total + price});
  },
  
  showProduct: function(name) {
    alert("you selected " +  name);
  },
  
  render: function() {
    var component = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product name={product.name} price={product.price}
          handleShow={component.showProduct}
          handleTotal={component.calculateTotal}/>
      );
    });
    
    return (
      <div>
        <ProductForm handleCreate={this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    );
  }
});

React.render(<ProductList/>, document.getElementById("root"));
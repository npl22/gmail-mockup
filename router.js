class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    this.render();

    window.addEventListener('hashchange', () => {
      this.render();
    });
  }

  activeRoute() {
    const currentRoute =  window.location.hash.slice(1);
    return this.routes[currentRoute];
  }

  render() {
    // this.node.innerHTML = "";
    //
    // const routeName = this.activeRoute();
    // const newNode = document.createElement('p');
    // newNode.innerHTML = routeName;
    //
    // this.node.appendChild(newNode);

    const component = this.activeRoute();
    if (component) {
      this.node.innerHTML = "";
      const newNode = component.render();
      this.node.appendChild(newNode);
    } else {
      this.node.innerHTML = "";
    }
  }
}

module.exports = Router;

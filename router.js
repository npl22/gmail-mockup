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

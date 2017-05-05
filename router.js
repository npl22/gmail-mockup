class Router {
  constructor(node) {
    this.node = node;
  }

  start() {
    this.render();

    window.addEventListener('hashchange', () => {
      this.render();
    });
  }

  activeRoute() {
    return window.location.hash.slice(1);
  }

  render() {
    this.node.innerHTML = "";

    const routeName = this.activeRoute();
    const newNode = document.createElement('p');
    newNode.innerHTML = routeName;

    this.node.appendChild(newNode);
  }
}

module.exports = Router;

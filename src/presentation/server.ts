import express, { Router } from "express";
import path from "path";

type Options = {
  port: number;
  routes: Router;
  publicPath?: string;
};

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, publicPath = "public" } = options;
    (this.port = port), (this.publicPath = publicPath);
    this.routes = routes;
  }

  async start() {
    //* Middlewares

    // Esto hace que todas las peticiones POST tomen el body como un JSON
    this.app.use(express.json());

    // Esto hace que se pueda recibir el body de las peticiones POST como format-urlenconded
    this.app.use(express.urlencoded({ extended: true }));

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on port: ${this.port}`);
    });
  }
}

import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../../hoc/PrivateRoute";
import { Layout } from "../../hoc/Layout";
import { ScreenLoading } from "../../components/UI/ScreenLoading";

const Main = React.lazy(() =>
  import("./Main").then(({ Main }) => ({ default: Main }))
);

const Product = React.lazy(() =>
  import("./Product").then(({ Product }) => ({ default: Product }))
);

const Products = React.lazy(() =>
  import("./Products").then(({ Products }) => ({ default: Products }))
);

const Profile = React.lazy(() =>
  import("./Profile").then(({ Profile }) => ({ default: Profile }))
);

const Cart = React.lazy(() =>
  import("./Cart").then(({ Cart }) => ({ default: Cart }))
);

const NotFoundPage = React.lazy(() =>
  import("../NotFoundPage").then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  }))
);

export function HomePage() {
  return (
    <Layout>
      <Suspense fallback={<ScreenLoading />}>
        <Switch>
          <Route component={Main} exact path="/home" />
          <Route component={Product} path="/home/products/:id" />
          <Route component={Products} path="/home/products" />
          <PrivateRoute component={Cart} path="/home/cart" />
          <PrivateRoute component={Profile} path="/home/profile" />
          <Route component={NotFoundPage} path="*" />
        </Switch>
      </Suspense>
    </Layout>
  );
}

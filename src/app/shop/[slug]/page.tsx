import ProductDetail from "./ProductDetail";

export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default function ProductDetailPage() {
  return <ProductDetail />;
}

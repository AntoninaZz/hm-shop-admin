import CategoryDetailsPage from "@/components/categories/CategoryDetailsPage";

export default async function Page({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  return <CategoryDetailsPage params={{ categoryId }} />;
}
export async function createProduct({
  newProduct,
}) {
  const { data, error } = await supabase
  .from("products")
  .create([{
    name: newProduct.name,
    type: newProduct.type,
    description: newProduct.description,
    ingredients: newProduct.ingredients,
    roasted: newProduct.roasted,
    special_ingredient: newProduct.special_ingredient,
  }])
  .select()
  .single();
  return {
    product: data,
    prices: newProduct.prices.map((price) => ({
      ...price,
      product_id: data.id,
    })),
  };
}
export function useCreateProduct() {
  const queryClient = useQueryClient();
  const { createPrices } = useCreatePrices();

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: createProductApi,
    onSuccess: ({ prices }) => {
      createPrices(prices);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => console.warn(err.message),
  });

  return { isCreating, createProduct };
}

export async function createPrices(newPrices: InsertTables<"prices">[]) {
  const { data, error } = await supabase
    .from("prices")
    .insert(newPrices)
    .select();

  if (error) {
    console.log(error);

    throw new Error("Failed to create prices");
  }
  return data;
}
VS
export async function createProduct({
  newProduct,
}) {
  const { data, error } = await supabase
  .from("products")
  .create([{
    name: newProduct.name,
    type: newProduct.type,
    description: newProduct.description,
    ingredients: newProduct.ingredients,
    roasted: newProduct.roasted,
    special_ingredient: newProduct.special_ingredient,
  }])
  .select()
  .single();
  await supabase
    .from("prices")
    .insert(newProduct.prices.map((price) => ({
      ...price,
      product_id: data.id,
    })))
    .select();
  return data;
}
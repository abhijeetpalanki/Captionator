export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  //   const { name, type } = file;

  console.log(file);

  return Response.json(file);
}

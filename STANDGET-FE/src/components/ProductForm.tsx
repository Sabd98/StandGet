import { useNavigate, useParams } from "react-router";
import useHttp from "../hooks/useHttp";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  //Get data if get Product ID
  useEffect(() => {
    if (id) {
      // Fetch product data
      sendRequest({
        url: `http://localhost:3000/products/${id}`,
        method: "GET",
      }).then((data) => setFormData(data));
    }
  }, [id]);

  //File Change Handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  //Product Add Handler
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    //Request Among Post/Put
    await sendRequest({
      url: id
        ? `http://localhost:3000/products/${id}`
        : "http://localhost:3000/products",
      method: id ? "PUT" : "POST",
      data: formDataToSend,
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/");
  };

  return (
    <section className="product_form m-auto">
      <h2 className="text-xl font-bold text-center text-black">Product Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <Input
          label="Name"
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Price"
          type="number"
          id="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <Input
          label="Description"
          type="text"
          id="description"
          value={formData.description}
          textarea
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Input
          label="Image"
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* {error && <Error title="Failed to submit" message={error} />} */}
        <Button type="submit" className="mt-4 mr-4">
          {id ? "Update" : "Add"} Product
        </Button>
      </form>
    </section>
  );
}

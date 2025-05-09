import CardGadget from "./CardGadget";
import useHttp from "../hooks/useHttp";
import Error from "./UI/Error";
import type { Products } from "../utils/interfaces";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";
import { URL_API } from "../utils/url";

export default function Products() {
  // Fetching Products state and Handler
  const [allGadgets, setAllGadgets] = useState<Products[]>([]);
  const { loading, error, sendRequest } = useHttp<Products[]>();
  const { user } = useAuth();

  const fetchProducts = useCallback(async () => {
    try {
      const data = await sendRequest({
        url: `${URL_API}/products`,
        method: "GET",
      });
      setAllGadgets(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [sendRequest]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteSuccess = () => {
    fetchProducts(); 
  };

  if (loading) {
    return <p className="center">Fetching gadgets...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch gadgets" message={error} />;
  }

  return (
    <main id="gadgets" className="mx-auto my-8 px-4 gap-4">
      {allGadgets?.map((gadget: Products) => (
        <CardGadget
          gadget={gadget}
          key={gadget.id}
          isAdmin={user?.role === "admin"}
          onDeleteSuccess={handleDeleteSuccess}
        />
      ))}
    </main>
  );
}

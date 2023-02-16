import { useState } from "react";
import ListaProductos from "../../products/listaProductos";
import ProductsBar from "../../products/productsBar";
import SaleBar from "./saleBar";

export default function ProductSearch( {categorias, setForceRender, forceRender, saleStatus, setSaleStatus, onClose}) {
   
    // Input
   const [busqueda, setBusqueda] = useState("");
   const [categoria, setCategoria] = useState("All");

    return (
        <>
            <ProductsBar setBusqueda={setBusqueda} categoriasDisponibles={categorias} setCategoria={setCategoria} />
            <SaleBar one="Categoría" two="Nombre" three="Precio" four="Acciones" />
            <ListaProductos setForceRender={setForceRender} forceRender={forceRender} value={busqueda} categoryValue={categoria} saleStatus={saleStatus} setSaleStatus={setSaleStatus} editMode={false} isSelling={true} goBack={onClose} />
        </>
    )
}
import { useContext } from "react";
import DataSelectPlaceContext from "../context/DataSelectPlaceContext";
const useDataSelectPlace=()=>useContext(DataSelectPlaceContext)
export default useDataSelectPlace
// app/_not-found.js
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("./not-found"), { ssr: false });

export default NotFound;

// "use client";
// import { exportToCSV } from "@/lib/csv";
// import { syncToCloud } from "@/lib/sync";

// export default function ExportControls() {
//   return (
//     <div className="flex gap-4 my-4">
//       <button
//         onClick={exportToCSV}
//         className="bg-gray-700 text-white px-4 py-2 rounded"
//       >
//         Export CSV
//       </button>
//       <button
//         onClick={syncToCloud}
//         className="bg-purple-600 text-white px-4 py-2 rounded"
//       >
//         Sync to Cloud
//       </button>
//     </div>
//   );
// }

"use client";

import { exportToCSV } from "@/lib/csv";
import { syncToCloud } from "@/lib/sync";

export default function ExportControls({ userId }: { userId: string }) {
  return (
    <div className="flex gap-4 my-4">
      <button
        onClick={() => exportToCSV(userId)}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Export CSV
      </button>
      <button
        onClick={() => syncToCloud()}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Sync to Cloud
      </button>
    </div>
  );
}
